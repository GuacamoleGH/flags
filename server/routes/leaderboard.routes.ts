// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Endpoint de consulta del ranking global y posiciones relativas.
 * @spec REQ-08
 */

import { Router, type Response } from 'express';
import { getDb } from '../db/database.js';
import { optionalAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', optionalAuth, (req: AuthenticatedRequest, res: Response): void => {
  try {
    const db = getDb();

    // Obtener los mejores 100 tiempos de los 196 países
    const rawRows = db.prepare(`
      SELECT
        lr.best_time_seconds,
        lr.achieved_at,
        u.id AS user_id,
        u.username,
        u.avatar
      FROM leaderboard_records lr
      JOIN users u ON u.id = lr.user_id
      ORDER BY lr.best_time_seconds ASC, lr.achieved_at ASC
      LIMIT 100
    `).all();

    const leaderboard = rawRows.map((row: any, index: number) => ({
      rank: index + 1,
      userId: row.user_id,
      username: row.username,
      avatar: row.avatar,
      bestTimeSeconds: row.best_time_seconds,
      achievedAt: row.achieved_at
    }));

    let currentUserRecord = null;
    if (req.user) {
      const userRank = db.prepare(`
        SELECT
          lr.best_time_seconds,
          lr.achieved_at,
          (
            SELECT COUNT(*) + 1
            FROM leaderboard_records lr2
            WHERE lr2.best_time_seconds < lr.best_time_seconds
               OR (lr2.best_time_seconds = lr.best_time_seconds AND lr2.achieved_at < lr.achieved_at)
          ) AS rank
        FROM leaderboard_records lr
        WHERE lr.user_id = ?
      `).get(req.user.id);

      if (userRank) {
        currentUserRecord = {
          rank: userRank.rank,
          username: req.user.username,
          avatar: req.user.avatar,
          bestTimeSeconds: userRank.best_time_seconds,
          achievedAt: userRank.achieved_at
        };
      }
    }

    res.json({
      leaderboard,
      currentUserRecord,
      totalEntries: leaderboard.length
    });
  } catch (error) {
    console.error('[Leaderboard Error]', error);
    res.status(500).json({ error: 'Error al consultar la tabla de clasificación global.' });
  }
});
