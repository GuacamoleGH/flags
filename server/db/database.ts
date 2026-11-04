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

/**
 * Obtiene la ruta absoluta del fichero SQLite, con fallback en ./data/flags.db.
 */
export function getDbPath(): string {
  if (process.env.DB_PATH) {
    if (process.env.DB_PATH === ':memory:') {
      return ':memory:';
    }
    return path.resolve(process.env.DB_PATH);
  }
  return path.resolve(process.cwd(), 'data', 'flags.db');
}

/**
 * Inicializa la base de datos SQLite con modo WAL y aplica el esquema relacional.
 */
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

  // Aplicar esquema relacional
  const schemaPath = path.resolve(process.cwd(), 'server', 'db', 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    dbInstance.exec(schemaSql);
  }

  // Migraciones automáticas no destructivas para homelab
  try {
    const tableInfo = dbInstance.prepare("PRAGMA table_info(match_history)").all();
    const hasMode = tableInfo.some((col: any) => col.name === 'game_mode');
    if (!hasMode) {
      dbInstance.exec("ALTER TABLE match_history ADD COLUMN game_mode TEXT NOT NULL DEFAULT 'world';");
    }
  } catch {}

  try {
    const lbInfo = dbInstance.prepare("PRAGMA table_info(leaderboard_records)").all();
    const hasLbMode = lbInfo.some((col: any) => col.name === 'game_mode');
    if (!hasLbMode) {
      dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS leaderboard_records_new (
          user_id INTEGER NOT NULL,
          game_mode TEXT NOT NULL DEFAULT 'world',
          best_time_seconds INTEGER NOT NULL,
          countries_count INTEGER NOT NULL,
          achieved_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (user_id, game_mode),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        INSERT OR IGNORE INTO leaderboard_records_new (user_id, game_mode, best_time_seconds, countries_count, achieved_at)
        SELECT user_id, 'world', best_time_seconds, countries_count, achieved_at FROM leaderboard_records;
        DROP TABLE leaderboard_records;
        ALTER TABLE leaderboard_records_new RENAME TO leaderboard_records;
      `);
    }
  } catch {}

  return dbInstance;
}

/**
 * Obtiene o genera la clave secreta persistente para la firma de tokens JWT.
 */
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

/**
 * Cierra la conexión de base de datos de forma segura.
 */
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
