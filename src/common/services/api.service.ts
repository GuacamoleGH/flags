// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Cliente API REST centralizado para autenticación, rankings y partidas.
 * @spec REQ-07, REQ-08, REQ-09, REQ-10
 */

export interface UserSession {
  id: number;
  username: string;
  avatar: string;
}

export interface ScoreSubmissionPayload {
  timeSeconds: number;
  countriesGuessed: number;
  totalCountries?: number;
  gameMode?: string;
  completed: boolean;
  language: 'es' | 'en';
}

export interface ScoreSubmissionResult {
  recorded: boolean;
  guest: boolean;
  timeSeconds: number;
  countriesGuessed: number;
  completed: boolean;
  isPersonalBest?: boolean;
  rank?: number | null;
  bestTimeSeconds?: number | null;
  message?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  avatar: string;
  bestTimeSeconds: number;
  achievedAt: string;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  currentUserRecord?: {
    rank: number;
    username: string;
    avatar: string;
    bestTimeSeconds: number;
    countriesCount?: number;
    gameMode?: string;
    achievedAt: string;
  } | null;
  gameMode?: string;
  totalEntries: number;
}

export interface UserProfileResponse {
  user: {
    username: string;
    avatar: string;
    createdAt: string;
  };
  stats: {
    bestTimeSeconds: number | null;
    bestTimeAchievedAt: string | null;
    globalRank: number | null;
    totalPlayed: number;
    totalCompleted: number;
    avgGuessed: number;
  };
  recentMatches: Array<{
    id: number;
    time_seconds: number;
    countries_guessed: number;
    total_countries: number;
    completed: number;
    is_personal_best: number;
    language: string;
    played_at: string;
  }>;
  isOwner: boolean;
}

class ApiService {
  private token: string | null = null;
  private currentUser: UserSession | null = null;
  private userChangeListeners = new Set<(user: UserSession | null) => void>();

  constructor() {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('guacamolegh_flags_token');
      const savedUser = localStorage.getItem('guacamolegh_flags_user');
      if (savedUser) {
        try {
          this.currentUser = JSON.parse(savedUser);
        } catch {
          this.currentUser = null;
        }
      }
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  public getCurrentUser(): UserSession | null {
    return this.currentUser;
  }

  public onUserChange(listener: (user: UserSession | null) => void): () => void {
    this.userChangeListeners.add(listener);
    return () => this.userChangeListeners.delete(listener);
  }

  private notifyUserChange(): void {
    this.userChangeListeners.forEach(fn => fn(this.currentUser));
  }

  private setSession(token: string, user: UserSession): void {
    this.token = token;
    this.currentUser = user;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('guacamolegh_flags_token', token);
      localStorage.setItem('guacamolegh_flags_user', JSON.stringify(user));
    }
    this.notifyUserChange();
  }

  public clearSession(): void {
    this.token = null;
    this.currentUser = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('guacamolegh_flags_token');
      localStorage.removeItem('guacamolegh_flags_user');
    }
    this.notifyUserChange();
  }

  private getHeaders(contentType = 'application/json'): HeadersInit {
    const headers: Record<string, string> = {};
    if (contentType) headers['Content-Type'] = contentType;
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    return headers;
  }

  public async register(username: string, password: string, avatar = 'flag-master'): Promise<UserSession> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, avatar })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al registrar usuario.');
    }

    this.setSession(data.token, data.user);
    return data.user;
  }

  public async login(username: string, password: string): Promise<UserSession> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al iniciar sesión.');
    }

    this.setSession(data.token, data.user);
    return data.user;
  }

  public async logout(): Promise<void> {
    try {
      if (this.token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: this.getHeaders()
        });
      }
    } catch {
      // Ignorar error al cerrar sesión en el servidor
    } finally {
      this.clearSession();
    }
  }

  public async checkAuth(): Promise<UserSession | null> {
    if (!this.token) return null;
    try {
      const res = await fetch('/api/auth/me', { headers: this.getHeaders() });
      if (!res.ok) {
        this.clearSession();
        return null;
      }
      const data = await res.json();
      this.currentUser = data.user;
      return data.user;
    } catch {
      return this.currentUser;
    }
  }

  public async submitScore(payload: ScoreSubmissionPayload): Promise<ScoreSubmissionResult> {
    const res = await fetch('/api/scores/submit', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al registrar la puntuación.');
    }
    return data;
  }

  public async getLeaderboard(mode = 'world'): Promise<LeaderboardResponse> {
    const res = await fetch(`/api/leaderboard?mode=${encodeURIComponent(mode)}`, { headers: this.getHeaders() });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al obtener la tabla de clasificación.');
    }
    return data;
  }

  public async getUserProfile(username: string): Promise<UserProfileResponse> {
    const res = await fetch(`/api/users/${encodeURIComponent(username)}`, { headers: this.getHeaders() });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al obtener el perfil de usuario.');
    }
    return data;
  }

  public async updateAvatar(avatar: string): Promise<UserSession> {
    const res = await fetch('/api/users/profile', {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ avatar })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al actualizar el avatar.');
    }
    if (this.currentUser) {
      this.currentUser.avatar = avatar;
      localStorage.setItem('guacamolegh_flags_user', JSON.stringify(this.currentUser));
      this.notifyUserChange();
    }
    return data.user;
  }

  public async getHistory(filter = 'all', sort = 'date'): Promise<any[]> {
    const res = await fetch(`/api/history?filter=${filter}&sort=${sort}`, { headers: this.getHeaders() });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al obtener el historial.');
    }
    return data.history;
  }
}

export const apiService = new ApiService();
