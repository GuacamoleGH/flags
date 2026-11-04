// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Rutas de consulta del historial personal de partidas.
 * @spec REQ-10
 */

import { Router, type Response } from 'express';
import { getDb } from '../db/database.js';
import { requireAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const historyRouter = Router();

historyRouter.get('/', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  const filter = req.query.filter as string || 'all';
  const sort = req.query.sort as string || 'date';

  try {
    const db = getDb();
    let query = `
      SELECT
        id, time_seconds, countries_guessed, total_countries,
        completed, is_personal_best, language, played_at
      FROM match_history
      WHERE user_id = ?
    `;

    const params: any[] = [req.user!.id];

    if (filter === 'completed') {
      query += ` AND completed = 1`;
    } else if (filter === 'abandoned') {
      query += ` AND completed = 0`;
    }

    if (sort === 'time') {
      query += ` ORDER BY time_seconds ASC, played_at DESC`;
    } else {
      query += ` ORDER BY played_at DESC`;
    }

    query += ` LIMIT 50`;

    const history = db.prepare(query).all(...params);

    res.json({
      history,
      filter,
      sort,
      totalCount: history.length
    });
  } catch (error) {
    console.error('[History Error]', error);
    res.status(500).json({ error: 'Error al consultar el historial de partidas.' });
  }
});
