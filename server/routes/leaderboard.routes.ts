// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Endpoint de consulta del ranking global por modo de juego (Mundo o Continentes).
 * @spec REQ-08
 */

import { Router, type Response } from 'express';
import { getDb } from '../db/database.js';
import { optionalAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', optionalAuth, (req: AuthenticatedRequest, res: Response): void => {
  const mode = (req.query.mode as string) || 'world';

  try {
    const db = getDb();

    // Obtener los mejores tiempos para el modo seleccionado
    const rawRows = db.prepare(`
      SELECT
        lr.best_time_seconds,
        lr.countries_count,
        lr.game_mode,
        lr.achieved_at,
        u.id AS user_id,
        u.username,
        u.avatar
      FROM leaderboard_records lr
      JOIN users u ON u.id = lr.user_id
      WHERE lr.game_mode = ?
      ORDER BY lr.best_time_seconds ASC, lr.achieved_at ASC
      LIMIT 100
    `).all(mode);

    const leaderboard = rawRows.map((row: any, index: number) => ({
      rank: index + 1,
      userId: row.user_id,
      username: row.username,
      avatar: row.avatar,
      bestTimeSeconds: row.best_time_seconds,
      countriesCount: row.countries_count,
      gameMode: row.game_mode,
      achievedAt: row.achieved_at
    }));

    let currentUserRecord = null;
    if (req.user) {
      const userRank = db.prepare(`
        SELECT
          lr.best_time_seconds,
          lr.countries_count,
          lr.game_mode,
          lr.achieved_at,
          (
            SELECT COUNT(*) + 1
            FROM leaderboard_records lr2
            WHERE lr2.game_mode = ? AND (
              lr2.best_time_seconds < lr.best_time_seconds
              OR (lr2.best_time_seconds = lr.best_time_seconds AND lr2.achieved_at < lr.achieved_at)
            )
          ) AS rank
        FROM leaderboard_records lr
        WHERE lr.user_id = ? AND lr.game_mode = ?
      `).get(mode, req.user.id, mode);

      if (userRank) {
        currentUserRecord = {
          rank: userRank.rank,
          username: req.user.username,
          avatar: req.user.avatar,
          bestTimeSeconds: userRank.best_time_seconds,
          countriesCount: userRank.countries_count,
          gameMode: userRank.game_mode,
          achievedAt: userRank.achieved_at
        };
      }
    }

    res.json({
      leaderboard,
      currentUserRecord,
      gameMode: mode,
      totalEntries: leaderboard.length
    });
  } catch (error) {
    console.error('[Leaderboard Error]', error);
    res.status(500).json({ error: 'Error al consultar la tabla de clasificación.' });
  }
});
