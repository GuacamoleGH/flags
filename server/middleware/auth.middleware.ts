// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Middleware de verificación de tokens JWT y sesiones activas.
 * @spec REQ-07
 */

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getDb, getJwtSecret } from '../db/database.js';

export interface AuthenticatedUser {
  id: number;
  username: string;
  avatar: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  token?: string;
}

export function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.substring(7).trim();
  if (!token) {
    return next();
  }

  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret) as { id: number; username: string };

    const db = getDb();
    // Validar que la sesión existe y no ha expirado
    const session = db.prepare(`
      SELECT s.token, u.id, u.username, u.avatar
      FROM active_sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.token = ? AND s.expires_at > datetime('now')
    `).get(token);

    if (session) {
      req.user = {
        id: session.id,
        username: session.username,
        avatar: session.avatar
      };
      req.token = token;
    }
  } catch {
    // Token inválido o expirado: continuamos en modo invitado
  }

  return next();
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  optionalAuth(req, res, () => {
    if (!req.user) {
      res.status(401).json({ error: 'Sesión no válida o expirada. Por favor, inicia sesión.' });
      return;
    }
    next();
  });
}
