// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Rutas de registro, autenticación y gestión de sesiones.
 * @spec REQ-07
 */

import crypto from 'node:crypto';
import { Router, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb, getJwtSecret } from '../db/database.js';
import { requireAuth, type AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const authRouter = Router();

const USERNAME_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_.\s-]{3,24}$/;

authRouter.post('/register', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { username, password, avatar } = req.body;

  if (!username || typeof username !== 'string' || !USERNAME_REGEX.test(username.trim())) {
    res.status(400).json({
      error: 'El nombre de usuario debe tener entre 3 y 24 caracteres (letras, números, puntos, guiones o guiones bajos).'
    });
    return;
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    res.status(400).json({
      error: 'La contraseña debe tener un mínimo de 6 caracteres.'
    });
    return;
  }

  const cleanUsername = username.trim();
  const cleanAvatar = (typeof avatar === 'string' && avatar.trim()) ? avatar.trim() : 'flag-master';

  try {
    const db = getDb();

    // Comprobar si ya existe el usuario (insensible a mayúsculas)
    const existing = db.prepare('SELECT id FROM users WHERE username = ? COLLATE NOCASE').get(cleanUsername);
    if (existing) {
      res.status(409).json({ error: 'El nombre de usuario ya está registrado. Por favor, elige otro.' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const insertResult = db.prepare(`
      INSERT INTO users (username, password_hash, avatar)
      VALUES (?, ?, ?)
    `).run(cleanUsername, passwordHash, cleanAvatar);

    const userId = Number(insertResult.lastInsertRowid);
    const secret = getJwtSecret();
    const token = jwt.sign(
      { id: userId, username: cleanUsername, jti: crypto.randomUUID() },
      secret,
      { expiresIn: '30d' }
    );

    // Guardar sesión activa con expiración en 30 días
    db.prepare(`
      INSERT INTO active_sessions (user_id, token, expires_at)
      VALUES (?, ?, datetime('now', '+30 days'))
    `).run(userId, token);

    res.status(201).json({
      message: 'Usuario registrado correctamente.',
      token,
      user: {
        id: userId,
        username: cleanUsername,
        avatar: cleanAvatar
      }
    });
  } catch (error) {
    console.error('[Auth Error] Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar el registro.' });
  }
});

authRouter.post('/login', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).json({ error: 'Debes proporcionar nombre de usuario y contraseña.' });
    return;
  }

  const cleanUsername = username.trim();

  try {
    const db = getDb();
    const user = db.prepare(`
      SELECT id, username, password_hash, avatar
      FROM users
      WHERE username = ? COLLATE NOCASE
    `).get(cleanUsername);

    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas. Revisa usuario o contraseña.' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      res.status(401).json({ error: 'Credenciales inválidas. Revisa usuario o contraseña.' });
      return;
    }

    const secret = getJwtSecret();
    const token = jwt.sign(
      { id: user.id, username: user.username, jti: crypto.randomUUID() },
      secret,
      { expiresIn: '30d' }
    );

    db.prepare(`
      INSERT INTO active_sessions (user_id, token, expires_at)
      VALUES (?, ?, datetime('now', '+30 days'))
    `).run(user.id, token);

    res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('[Auth Error] Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar el inicio de sesión.' });
  }
});

authRouter.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  res.json({ user: req.user });
});

authRouter.post('/logout', (req: AuthenticatedRequest, res: Response): void => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    try {
      const db = getDb();
      db.prepare('DELETE FROM active_sessions WHERE token = ?').run(token);
    } catch {
      // Ignorar si falla
    }
  }
  res.json({ message: 'Sesión cerrada exitosamente.' });
});
