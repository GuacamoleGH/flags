// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Conector y gestor de persistencia SQLite nativo (node:sqlite DatabaseSync) para Homelab.
 * @spec REQ-07, REQ-11
 */

import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const require = createRequire(import.meta.url);
const { DatabaseSync } = require('node:sqlite');

let dbInstance: any = null;

export function getDbPath(): string {
  if (process.env.DB_PATH) {
    if (process.env.DB_PATH === ':memory:') {
      return ':memory:';
    }
    return path.resolve(process.env.DB_PATH);
  }
  return path.resolve(process.cwd(), 'data', 'flags.db');
}

export function getDb(): any {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath = getDbPath();
  if (dbPath !== ':memory:') {
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
  }

  dbInstance = new DatabaseSync(dbPath);

  // Optimizaciones de rendimiento y fiabilidad para homelab
  dbInstance.exec('PRAGMA journal_mode = WAL;');
  dbInstance.exec('PRAGMA synchronous = NORMAL;');
  dbInstance.exec('PRAGMA foreign_keys = ON;');

  // Migraciones previas: asegurar columnas antes de aplicar índices de schema.sql
  try {
    const mhCols = dbInstance.prepare("PRAGMA table_info(match_history)").all();
    if (mhCols.length > 0 && !mhCols.some((col: any) => col.name === 'game_mode')) {
      dbInstance.exec("ALTER TABLE match_history ADD COLUMN game_mode TEXT NOT NULL DEFAULT 'world';");
    }
  } catch (err) {
    console.error('[Pre-Migration match_history]', err);
  }

  try {
    const lbCols = dbInstance.prepare("PRAGMA table_info(leaderboard_records)").all();
    if (lbCols.length > 0 && !lbCols.some((col: any) => col.name === 'game_mode')) {
      dbInstance.exec("ALTER TABLE leaderboard_records ADD COLUMN game_mode TEXT NOT NULL DEFAULT 'world';");
    }
  } catch (err) {
    console.error('[Pre-Migration leaderboard_records]', err);
  }

  // Aplicar esquema relacional base
  const schemaPath = path.resolve(process.cwd(), 'server', 'db', 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    dbInstance.exec(schemaSql);
  }

  try {
    dbInstance.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_lb_user_mode ON leaderboard_records(user_id, game_mode);");
  } catch {}

  return dbInstance;
}

export function getJwtSecret(): string {
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.trim().length >= 16) {
    return process.env.JWT_SECRET.trim();
  }

  const secretPath = path.resolve(process.cwd(), 'data', 'jwt.secret');
  if (fs.existsSync(secretPath)) {
    return fs.readFileSync(secretPath, 'utf8').trim();
  }

  const dir = path.dirname(secretPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const generated = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(secretPath, generated, { encoding: 'utf8', mode: 0o600 });
  return generated;
}

export function closeDb(): void {
  if (dbInstance) {
    try {
      dbInstance.exec('PRAGMA wal_checkpoint(TRUNCATE);');
      dbInstance.close();
    } catch {
      // Ignorar errores al cerrar
    } finally {
      dbInstance = null;
    }
  }
}
