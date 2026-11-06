// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '../server/index';
import { getDb, closeDb } from '../server/db/database';
import type { Server } from 'node:http';

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  process.env.DB_PATH = ':memory:';
  process.env.JWT_SECRET = 'super-secret-test-jwt-key-minimum-32-chars-long';

  // Inicializar base de datos en memoria
  getDb();

  await new Promise<void>((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const addr = server.address() as any;
      baseUrl = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  closeDb();
});

describe('Backend API & Security Integration', () => {
  let authToken = '';
  const testUser = `player_${Date.now()}`;

  it('GET /api/health returns healthy database status', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('ok');
    expect(data.service).toBe('guacamolegh-flags');
  });

  it('POST /api/auth/register creates a user with hashed password', async () => {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: testUser,
        password: 'securePassword123!',
        avatar: 'compass'
      })
    });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.token).toBeTruthy();
    expect(data.user.username).toBe(testUser);
    expect(data.user.avatar).toBe('compass');
    authToken = data.token;
  });

  it('POST /api/auth/login verifies credentials', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: testUser,
        password: 'securePassword123!'
      })
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.token).toBeTruthy();
    expect(data.user.username).toBe(testUser);
  });

  it('POST /api/scores/submit rejects physically impossible time (Anti-cheat)', async () => {
    const res = await fetch(`${baseUrl}/api/scores/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        timeSeconds: 5, // Imposible en 5 segundos
        countriesGuessed: 196,
        completed: true,
        language: 'es'
      })
    });

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/duración no humanamente plausible/i);
  });

  it('POST /api/scores/submit registers valid completed match and updates leaderboard', async () => {
    const res = await fetch(`${baseUrl}/api/scores/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        timeSeconds: 320, // 5m 20s
        countriesGuessed: 196,
        totalCountries: 196,
        gameMode: 'world',
        completed: true,
        language: 'es'
      })
    });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.recorded).toBe(true);
    expect(data.isPersonalBest).toBe(true);
    expect(data.rank).toBe(1);
    expect(data.bestTimeSeconds).toBe(320);
    expect(data.previousBestTimeSeconds).toBeNull();
    expect(data.timeDiffSeconds).toBeNull();
  });


  it('GET /api/leaderboard displays real database record and current user position', async () => {
    const res = await fetch(`${baseUrl}/api/leaderboard`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.leaderboard.length).toBeGreaterThanOrEqual(1);
    expect(data.leaderboard[0].username).toBe(testUser);
    expect(data.leaderboard[0].bestTimeSeconds).toBe(320);
    expect(data.currentUserRecord).toBeTruthy();
    expect(data.currentUserRecord.rank).toBe(1);
  });

  it('GET /api/users/:username returns accurate player profile and stats', async () => {
    const res = await fetch(`${baseUrl}/api/users/${testUser}`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.user.username).toBe(testUser);
    expect(data.stats.bestTimeSeconds).toBe(320);
    expect(data.stats.totalCompleted).toBe(1);
    expect(data.stats.totalPlayed).toBe(1);
  });

  it('GET /api/history returns match history for authenticated user', async () => {
    const res = await fetch(`${baseUrl}/api/history`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.history.length).toBe(1);
    expect(data.history[0].time_seconds).toBe(320);
    expect(data.history[0].completed).toBe(1);
  });

  it('POST /api/scores/submit calculates improvement and worsening diff against previous PB', async () => {
    // 1. Mejora tiempo de 320 a 300 segundos (-20s)
    const resImprove = await fetch(`${baseUrl}/api/scores/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        timeSeconds: 300,
        countriesGuessed: 196,
        totalCountries: 196,
        gameMode: 'world',
        completed: true,
        language: 'es'
      })
    });

    expect(resImprove.status).toBe(201);
    const dataImprove = await resImprove.json();
    expect(dataImprove.isPersonalBest).toBe(true);
    expect(dataImprove.previousBestTimeSeconds).toBe(320);
    expect(dataImprove.timeDiffSeconds).toBe(-20);

    // 2. Empeora tiempo respecto a su nuevo récord de 300 segundos (+15s)
    const resWorse = await fetch(`${baseUrl}/api/scores/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        timeSeconds: 315,
        countriesGuessed: 196,
        totalCountries: 196,
        gameMode: 'world',
        completed: true,
        language: 'es'
      })
    });

    expect(resWorse.status).toBe(201);
    const dataWorse = await resWorse.json();
    expect(dataWorse.isPersonalBest).toBe(false);
    expect(dataWorse.previousBestTimeSeconds).toBe(300);
    expect(dataWorse.timeDiffSeconds).toBe(15);
  });
});
