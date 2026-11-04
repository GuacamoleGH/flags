// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Registro y validación anti-fraude de partidas y puntuaciones por modo de juego.
 * @spec REQ-05, REQ-08, REQ-10
 */

import { Router, type Response } from 'express';
import { getDb } from '../db/database.js';
import { optionalAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const scoresRouter = Router();

const VALID_MODES = new Set(['world', 'europe', 'asia', 'africa', 'americas', 'oceania']);

scoresRouter.post('/submit', optionalAuth, (req: AuthenticatedRequest, res: Response): void => {
  const { timeSeconds, countriesGuessed, totalCountries, completed, language, gameMode } = req.body;

  const parsedTime = parseInt(timeSeconds, 10);
  const parsedGuessed = parseInt(countriesGuessed, 10);
  const parsedTotal = parseInt(totalCountries, 10) || 196;
  const mode = VALID_MODES.has(gameMode) ? gameMode : 'world';
  const isCompleted = Boolean(completed) && parsedGuessed === parsedTotal;
  const lang = (language === 'en' ? 'en' : 'es');

  // Validaciones de tipo y rango
  if (isNaN(parsedTime) || parsedTime <= 0) {
    res.status(400).json({ error: 'El tiempo de la partida no es válido.' });
    return;
  }

  if (isNaN(parsedGuessed) || parsedGuessed < 0 || parsedGuessed > parsedTotal) {
    res.status(400).json({ error: 'El número de países acertados no es válido.' });
    return;
  }

  // Anti-cheat: mínimo 0.15 segundos por país para considerarse humanamente posible
  const minimumSeconds = Math.max(3, Math.floor(parsedTotal * 0.13));
  if (isCompleted && parsedTime < minimumSeconds) {
    res.status(400).json({ error: 'Resultado rechazado: duración no humanamente plausible.' });
    return;
  }

  // Modo invitado
  if (!req.user) {
    res.json({
      recorded: false,
      guest: true,
      timeSeconds: parsedTime,
      countriesGuessed: parsedGuessed,
      totalCountries: parsedTotal,
      gameMode: mode,
      completed: isCompleted,
      message: 'Partida finalizada en modo invitado.'
    });
    return;
  }

  const userId = req.user.id;
  const db = getDb();

  try {
    // Comprobar récord personal actual para este modo de juego
    const currentBest = db.prepare(`
      SELECT best_time_seconds, achieved_at
      FROM leaderboard_records
      WHERE user_id = ? AND game_mode = ?
    `).get(userId, mode);

    let isPersonalBest = false;
    if (isCompleted) {
      if (!currentBest || parsedTime < currentBest.best_time_seconds) {
        isPersonalBest = true;
      }
    }

    // Registrar en el historial de partidas
    db.prepare(`
      INSERT INTO match_history (
        user_id, game_mode, time_seconds, countries_guessed, total_countries,
        completed, is_personal_best, language
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      mode,
      parsedTime,
      parsedGuessed,
      parsedTotal,
      isCompleted ? 1 : 0,
      isPersonalBest ? 1 : 0,
      lang
    );

    let globalRank: number | null = null;
    if (isPersonalBest) {
      db.prepare(`
        INSERT INTO leaderboard_records (user_id, game_mode, best_time_seconds, countries_count, achieved_at)
        VALUES (?, ?, ?, ?, datetime('now'))
        ON CONFLICT(user_id, game_mode) DO UPDATE SET
          best_time_seconds = excluded.best_time_seconds,
          countries_count = excluded.countries_count,
          achieved_at = excluded.achieved_at
      `).run(userId, mode, parsedTime, parsedTotal);

      const rankRow = db.prepare(`
        SELECT COUNT(*) + 1 AS rank
        FROM leaderboard_records
        WHERE game_mode = ? AND best_time_seconds < ?
      `).get(mode, parsedTime);
      globalRank = rankRow ? rankRow.rank : 1;
    } else if (currentBest) {
      const rankRow = db.prepare(`
        SELECT COUNT(*) + 1 AS rank
        FROM leaderboard_records
        WHERE game_mode = ? AND (best_time_seconds < ? OR (best_time_seconds = ? AND achieved_at <= ?))
      `).get(mode, currentBest.best_time_seconds, currentBest.best_time_seconds, currentBest.achieved_at);
      globalRank = rankRow ? rankRow.rank : null;
    }

    res.status(201).json({
      recorded: true,
      guest: false,
      timeSeconds: parsedTime,
      countriesGuessed: parsedGuessed,
      totalCountries: parsedTotal,
      gameMode: mode,
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
