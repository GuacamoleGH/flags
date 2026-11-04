// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Registro y validación anti-fraude de partidas y puntuaciones.
 * @spec REQ-05, REQ-08, REQ-10
 */

import { Router, type Response } from 'express';
import { getDb } from '../db/database.js';
import { optionalAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const scoresRouter = Router();

const TOTAL_COUNTRIES = 196;
const MINIMUM_TIME_COMPLETION_SECONDS = 25; // 25 segundos es el umbral anti-bot estricto para 196 banderas

scoresRouter.post('/submit', optionalAuth, (req: AuthenticatedRequest, res: Response): void => {
  const { timeSeconds, countriesGuessed, completed, language } = req.body;

  const parsedTime = parseInt(timeSeconds, 10);
  const parsedGuessed = parseInt(countriesGuessed, 10);
  const isCompleted = Boolean(completed) && parsedGuessed === TOTAL_COUNTRIES;
  const lang = (language === 'en' ? 'en' : 'es');

  // Validaciones básicas de tipo y rango
  if (isNaN(parsedTime) || parsedTime <= 0) {
    res.status(400).json({ error: 'El tiempo de la partida no es válido.' });
    return;
  }

  if (isNaN(parsedGuessed) || parsedGuessed < 0 || parsedGuessed > TOTAL_COUNTRIES) {
    res.status(400).json({ error: 'El número de países acertados no es válido.' });
    return;
  }

  // Validación anti-trampas
  if (isCompleted && parsedTime < MINIMUM_TIME_COMPLETION_SECONDS) {
    res.status(400).json({ error: 'Resultado rechazado: duración no humanamente plausible.' });
    return;
  }

  // Si el usuario no ha iniciado sesión, responder confirmación de modo invitado
  if (!req.user) {
    res.json({
      recorded: false,
      guest: true,
      timeSeconds: parsedTime,
      countriesGuessed: parsedGuessed,
      completed: isCompleted,
      message: 'Partida finalizada en modo invitado. Inicia sesión para guardar tu récord en el ranking global.'
    });
    return;
  }

  const userId = req.user.id;
  const db = getDb();

  try {
    // Comprobar récord personal actual en el ranking
    const currentBest = db.prepare(`
      SELECT best_time_seconds, achieved_at
      FROM leaderboard_records
      WHERE user_id = ?
    `).get(userId);

    let isPersonalBest = false;
    if (isCompleted) {
      if (!currentBest || parsedTime < currentBest.best_time_seconds) {
        isPersonalBest = true;
      }
    }

    // Registrar en el historial de partidas
    db.prepare(`
      INSERT INTO match_history (
        user_id, time_seconds, countries_guessed, total_countries,
        completed, is_personal_best, language
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      parsedTime,
      parsedGuessed,
      TOTAL_COUNTRIES,
      isCompleted ? 1 : 0,
      isPersonalBest ? 1 : 0,
      lang
    );

    // Si es nuevo récord personal completando los 196, actualizar el leaderboard
    let globalRank: number | null = null;
    if (isPersonalBest) {
      db.prepare(`
        INSERT INTO leaderboard_records (user_id, best_time_seconds, countries_count, achieved_at)
        VALUES (?, ?, ?, datetime('now'))
        ON CONFLICT(user_id) DO UPDATE SET
          best_time_seconds = excluded.best_time_seconds,
          achieved_at = excluded.achieved_at
      `).run(userId, parsedTime, TOTAL_COUNTRIES);

      // Calcular posición en el ranking global
      const rankRow = db.prepare(`
        SELECT COUNT(*) + 1 AS rank
        FROM leaderboard_records
        WHERE best_time_seconds < ?
      `).get(parsedTime);
      globalRank = rankRow ? rankRow.rank : 1;
    } else if (currentBest) {
      const rankRow = db.prepare(`
        SELECT COUNT(*) + 1 AS rank
        FROM leaderboard_records
        WHERE best_time_seconds < ? OR (best_time_seconds = ? AND achieved_at <= ?)
      `).get(currentBest.best_time_seconds, currentBest.best_time_seconds, currentBest.achieved_at);
      globalRank = rankRow ? rankRow.rank : null;
    }

    res.status(201).json({
      recorded: true,
      guest: false,
      timeSeconds: parsedTime,
      countriesGuessed: parsedGuessed,
      completed: isCompleted,
      isPersonalBest,
      rank: globalRank,
      bestTimeSeconds: isPersonalBest ? parsedTime : (currentBest?.best_time_seconds || null)
    });
  } catch (error) {
    console.error('[Score Submit Error]', error);
    res.status(500).json({ error: 'Error al registrar la partida en la base de datos.' });
  }
});
