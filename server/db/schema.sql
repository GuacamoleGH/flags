-- =============================================================================
-- GuacamoleGH Flags — Esquema Relacional SQLite para Homelab
-- Copyright (c) 2026 GuacamoleGH
-- Licensed under the MIT License. See LICENSE for details.
-- Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
-- =============================================================================

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT COLLATE NOCASE UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT 'flag-master',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Tabla de Récords Oficiales (Global Leaderboard por Modo de Juego)
CREATE TABLE IF NOT EXISTS leaderboard_records (
  user_id INTEGER NOT NULL,
  game_mode TEXT NOT NULL DEFAULT 'world',
  best_time_seconds INTEGER NOT NULL,
  countries_count INTEGER NOT NULL,
  achieved_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, game_mode),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_mode_time ON leaderboard_records(game_mode, best_time_seconds ASC, achieved_at ASC);

-- Tabla de Historial de Partidas
CREATE TABLE IF NOT EXISTS match_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  game_mode TEXT NOT NULL DEFAULT 'world',
  time_seconds INTEGER NOT NULL,
  countries_guessed INTEGER NOT NULL,
  total_countries INTEGER NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  is_personal_best INTEGER NOT NULL DEFAULT 0,
  language TEXT NOT NULL DEFAULT 'es',
  played_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_match_history_user_mode ON match_history(user_id, game_mode, played_at DESC);
CREATE INDEX IF NOT EXISTS idx_match_history_completed ON match_history(completed, time_seconds ASC);

-- Tabla de Sesiones Activas
CREATE TABLE IF NOT EXISTS active_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_active_sessions_token ON active_sessions(token);
