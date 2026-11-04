// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Servidor principal Node.js/Express para GuacamoleGH Flags en Homelab.
 * @spec REQ-07, REQ-11
 */

import express, { type Request, type Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { getDb, closeDb } from './db/database.js';
import { authRouter } from './routes/auth.routes.js';
import { scoresRouter } from './routes/scores.routes.js';
import { leaderboardRouter } from './routes/leaderboard.routes.js';
import { usersRouter } from './routes/users.routes.js';
import { historyRouter } from './routes/history.routes.js';

export const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Configuración de parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Cabeceras básicas de seguridad y CORS para entorno homelab
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Endpoint de Healthcheck para Docker y reverse proxies (Traefik / Nginx / Cloudflare)
app.get('/api/health', (_req: Request, res: Response) => {
  try {
    const db = getDb();
    db.prepare('SELECT 1').get();
    res.json({
      status: 'ok',
      service: 'guacamolegh-flags',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({
      status: 'unhealthy',
      error: 'Base de datos no disponible',
      timestamp: new Date().toISOString()
    });
  }
});

// Rutas de API REST
app.use('/api/auth', authRouter);
app.use('/api/scores', scoresRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/users', usersRouter);
app.use('/api/history', historyRouter);

// Servir frontend compilado (dist) en producción o si existe
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1h' }));

  // Fallback SPA para rutas cliente
  app.get('*', (req: Request, res: Response, next) => {
    if (req.path.startsWith('/api/')) {
      next();
      return;
    }
    const indexFile = path.join(distPath, 'index.html');
    if (fs.existsSync(indexFile)) {
      res.sendFile(indexFile);
    } else {
      next();
    }
  });
} else {
  // En desarrollo o antes del build, servir la carpeta public directamente (para banderas)
  const publicPath = path.resolve(process.cwd(), 'public');
  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
  }
}

// Iniciar servidor solo si este archivo se ejecuta directamente
const normalizedArgv = (process.argv[1] || '').replace(/\\/g, '/');
const isDirectExecution = (
  normalizedArgv.endsWith('server/index.ts') ||
  normalizedArgv.endsWith('server/index.js')
);

if (isDirectExecution || process.env.NODE_ENV === 'production') {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[GuacamoleGH Flags] Servidor iniciado en http://0.0.0.0:${PORT}`);
    console.log(`[Homelab] Healthcheck disponible en http://0.0.0.0:${PORT}/api/health`);
  });

  const shutdown = () => {
    console.log('\n[GuacamoleGH Flags] Cerrando servidor...');
    server.close(() => {
      closeDb();
      console.log('[GuacamoleGH Flags] Servidor y base de datos cerrados.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
