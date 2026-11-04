// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Rutas de perfiles públicos y gestión de perfil privado.
 * @spec REQ-09
 */

import { Router, type Response } from 'express';
import { getDb } from '../db/database.js';
import { requireAuth, optionalAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const usersRouter = Router();

usersRouter.get('/:username', optionalAuth, (req: AuthenticatedRequest, res: Response): void => {
  const { username } = req.params;
  if (!username) {
    res.status(400).json({ error: 'Nombre de usuario requerido.' });
    return;
  }

  try {
    const db = getDb();
    const user = db.prepare(`
      SELECT id, username, avatar, created_at
      FROM users
      WHERE username = ? COLLATE NOCASE
    `).get(username);

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado.' });
      return;
    }

    // Récord personal
    const record = db.prepare(`
      SELECT best_time_seconds, achieved_at
      FROM leaderboard_records
      WHERE user_id = ?
    `).get(user.id);

    // Posición en ranking
    let globalRank = null;
    if (record) {
      const rankRow = db.prepare(`
        SELECT COUNT(*) + 1 AS rank
        FROM leaderboard_records
        WHERE best_time_seconds < ? OR (best_time_seconds = ? AND achieved_at < ?)
      `).get(record.best_time_seconds, record.best_time_seconds, record.achieved_at);
      globalRank = rankRow ? rankRow.rank : null;
    }

    // Estadísticas agregadas
    const stats = db.prepare(`
      SELECT
        COUNT(*) AS total_played,
        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) AS total_completed,
        AVG(countries_guessed) AS avg_guessed
      FROM match_history
      WHERE user_id = ?
    `).get(user.id);

    // Historial reciente (últimas 10 partidas)
    const recentMatches = db.prepare(`
      SELECT
        id, time_seconds, countries_guessed, total_countries,
        completed, is_personal_best, language, played_at
      FROM match_history
      WHERE user_id = ?
      ORDER BY played_at DESC
      LIMIT 10
    `).all(user.id);

    const isOwner = req.user ? req.user.id === user.id : false;

    res.json({
      user: {
        username: user.username,
        avatar: user.avatar,
        createdAt: user.created_at
      },
      stats: {
        bestTimeSeconds: record ? record.best_time_seconds : null,
        bestTimeAchievedAt: record ? record.achieved_at : null,
        globalRank,
        totalPlayed: stats.total_played || 0,
        totalCompleted: stats.total_completed || 0,
        avgGuessed: stats.avg_guessed ? Math.round(stats.avg_guessed) : 0
      },
      recentMatches,
      isOwner
    });
  } catch (error) {
    console.error('[Users Error]', error);
    res.status(500).json({ error: 'Error al consultar el perfil de usuario.' });
  }
});

usersRouter.patch('/profile', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  const { avatar } = req.body;
  if (!avatar || typeof avatar !== 'string' || avatar.trim().length === 0) {
    res.status(400).json({ error: 'Avatar no válido.' });
    return;
  }

  const cleanAvatar = avatar.trim().slice(0, 32);

  try {
    const db = getDb();
    db.prepare(`
      UPDATE users
      SET avatar = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(cleanAvatar, req.user!.id);

    res.json({
      message: 'Perfil actualizado exitosamente.',
      user: {
        id: req.user!.id,
        username: req.user!.username,
        avatar: cleanAvatar
      }
    });
  } catch (error) {
    console.error('[Update Profile Error]', error);
    res.status(500).json({ error: 'Error al actualizar el perfil.' });
  }
});
