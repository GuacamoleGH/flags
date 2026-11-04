// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Vista SPA de Rankings Globales por modo de juego (Mundo y Continentes).
 * @spec REQ-08
 */

import { t } from '../i18n';
import { apiService, type LeaderboardResponse } from '../services/api.service';
import { getAvatarIcon, escapeHtml } from './Header';
import { quizEngine } from '../../quiz/QuizEngine';

export class LeaderboardView {
  private container: HTMLElement;
  private currentMode = 'world';

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'leaderboard-page-view';
  }

  public async mount(target: HTMLElement): Promise<void> {
    target.appendChild(this.container);
    await this.fetchAndRender();
  }

  public unmount(): void {
    this.container.remove();
  }

  private async fetchAndRender(): Promise<void> {
    this.container.innerHTML = `
      <div class="site-container" style="max-width: 1000px; margin: 0 auto; padding-bottom: 60px;">
        <div style="text-align: center; padding: 30px 0 20px 0;">
          <h1 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 8px;">
            🏆 ${t('leaderboardTitle')}
          </h1>
          <p style="color: var(--color-text-secondary);">${t('leaderboardSubtitle')}</p>
        </div>
        <div style="text-align: center; color: var(--color-text-muted);">Cargando clasificación...</div>
      </div>
    `;

    try {
      const data = await apiService.getLeaderboard(this.currentMode);
      this.render(data);
    } catch (err: any) {
      this.container.innerHTML = `
        <div class="site-container">
          <div class="form-error-msg" style="max-width: 600px; margin: 40px auto; text-align: center;">
            ${err.message || 'Error al cargar la tabla de clasificación.'}
          </div>
        </div>
      `;
    }
  }

  private render(data: LeaderboardResponse): void {
    const { leaderboard, currentUserRecord } = data;

    this.container.innerHTML = `
      <div class="site-container" style="max-width: 1000px; margin: 0 auto; padding-bottom: 60px;">
        <div style="text-align: center; padding: 30px 0 20px 0;">
          <h1 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em;">
            🏆 ${t('leaderboardTitle')}
          </h1>
          <p style="color: var(--color-text-secondary); font-size: 1rem;">
            ${t('leaderboardSubtitle')}
          </p>
        </div>

        <!-- Selector de Modo de Juego en Leaderboard -->
        <div class="game-mode-selector-bar" style="margin-bottom: 24px; justify-content: center;">
          <span class="mode-bar-label">${t('lblGameMode')}:</span>
          <div class="mode-pills-wrap">
            <button class="mode-pill-btn ${this.currentMode === 'world' ? 'active' : ''}" data-lb-mode="world">
              🌍 ${t('modeWorld')}
            </button>
            <button class="mode-pill-btn ${this.currentMode === 'europe' ? 'active' : ''}" data-lb-mode="europe">
              🏰 ${t('modeEurope')}
            </button>
            <button class="mode-pill-btn ${this.currentMode === 'asia' ? 'active' : ''}" data-lb-mode="asia">
              🏯 ${t('modeAsia')}
            </button>
            <button class="mode-pill-btn ${this.currentMode === 'africa' ? 'active' : ''}" data-lb-mode="africa">
              🦁 ${t('modeAfrica')}
            </button>
            <button class="mode-pill-btn ${this.currentMode === 'americas' ? 'active' : ''}" data-lb-mode="americas">
              🌎 ${t('modeAmericas')}
            </button>
            <button class="mode-pill-btn ${this.currentMode === 'oceania' ? 'active' : ''}" data-lb-mode="oceania">
              🏝️ ${t('modeOceania')}
            </button>
          </div>
        </div>

        ${currentUserRecord ? `
          <div style="background: rgba(0, 245, 155, 0.08); border: 1px solid var(--color-accent-green); border-radius: var(--radius-md); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 1.5rem;">${getAvatarIcon(currentUserRecord.avatar)}</span>
              <div>
                <div style="font-size: 0.8rem; color: var(--color-text-muted);">${t('yourRankBanner')}</div>
                <div style="font-weight: 800; font-size: 1.1rem; color: var(--color-accent-green);">
                  Puesto #${currentUserRecord.rank} — ${escapeHtml(currentUserRecord.username)}
                </div>
              </div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 1.3rem; font-weight: 800; color: var(--color-text-primary);">
              ⏱️ ${quizEngine.formatTime(currentUserRecord.bestTimeSeconds)}
            </div>
          </div>
        ` : ''}

        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 80px; text-align: center;">${t('colRank')}</th>
                <th>${t('colPlayer')}</th>
                <th style="width: 140px; text-align: right;">${t('colTime')}</th>
                <th style="width: 180px; text-align: right;">${t('colDate')}</th>
              </tr>
            </thead>
            <tbody>
              ${leaderboard.length === 0 ? `
                <tr>
                  <td colspan="4" class="empty-table-notice">${t('noRecords')}</td>
                </tr>
              ` : leaderboard.map(entry => {
                const isCurrent = currentUserRecord && currentUserRecord.rank === entry.rank && currentUserRecord.username === entry.username;
                let rankClass = 'rank-badge';
                if (entry.rank === 1) rankClass += ' top-1';
                else if (entry.rank === 2) rankClass += ' top-2';
                else if (entry.rank === 3) rankClass += ' top-3';

                const formattedDate = new Date(entry.achievedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                return `
                  <tr class="${isCurrent ? 'user-current-row' : ''}">
                    <td style="text-align: center;">
                      <span class="${rankClass}">${entry.rank}</span>
                    </td>
                    <td>
                      <a href="#profile/${encodeURIComponent(entry.username)}" class="player-cell">
                        <span>${getAvatarIcon(entry.avatar)}</span>
                        <span>${escapeHtml(entry.username)}</span>
                      </a>
                    </td>
                    <td style="text-align: right; font-family: var(--font-mono); font-weight: 700; color: var(--color-accent-green);">
                      ${quizEngine.formatTime(entry.bestTimeSeconds)}
                    </td>
                    <td style="text-align: right; color: var(--color-text-muted); font-size: 0.85rem;">
                      ${formattedDate}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Eventos de cambio de modo en el Leaderboard
    this.container.querySelectorAll('[data-lb-mode]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        this.currentMode = target.getAttribute('data-lb-mode') || 'world';
        this.fetchAndRender();
      });
    });
  }
}
