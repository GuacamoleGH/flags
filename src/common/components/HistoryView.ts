// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Vista SPA de Historial de Partidas personal con filtros y ordenación.
 * @spec REQ-10
 */

import { t } from '../i18n';
import { apiService } from '../services/api.service';
import { quizEngine } from '../../quiz/QuizEngine';

export class HistoryView {
  private container: HTMLElement;
  private currentFilter = 'all';
  private currentSort = 'date';

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'history-page-view';
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
          <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 8px;">
            📜 ${t('historyTitle')}
          </h1>
          <p style="color: var(--color-text-secondary);">${t('historySubtitle')}</p>
        </div>
        <div style="text-align: center; color: var(--color-text-muted);">Cargando historial...</div>
      </div>
    `;

    try {
      const history = await apiService.getHistory(this.currentFilter, this.currentSort);
      this.render(history);
    } catch (err: any) {
      this.container.innerHTML = `
        <div class="site-container">
          <div class="form-error-msg" style="max-width: 600px; margin: 40px auto; text-align: center;">
            ${err.message || 'Error al cargar el historial de partidas.'}
          </div>
        </div>
      `;
    }
  }

  private render(history: any[]): void {
    this.container.innerHTML = `
      <div class="site-container" style="max-width: 1000px; margin: 0 auto; padding-bottom: 60px;">
        <div style="text-align: center; padding: 30px 0 20px 0;">
          <h1 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em;">
            📜 ${t('historyTitle')}
          </h1>
          <p style="color: var(--color-text-secondary);">${t('historySubtitle')}</p>
        </div>

        <!-- Controles de Filtro y Ordenación -->
        <div class="history-controls-bar">
          <div class="history-filter-group" role="group" aria-label="Filtro de partidas">
            <button class="history-pill-btn continent-pill ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">
              <span class="pill-label">${t('filterAll')}</span>
            </button>
            <button class="history-pill-btn continent-pill filter-completed ${this.currentFilter === 'completed' ? 'active' : ''}" data-filter="completed">
              <span class="pill-icon">✓</span>
              <span class="pill-label">${t('filterCompleted')}</span>
            </button>
            <button class="history-pill-btn continent-pill filter-abandoned ${this.currentFilter === 'abandoned' ? 'active' : ''}" data-filter="abandoned">
              <span class="pill-icon">✕</span>
              <span class="pill-label">${t('filterAbandoned')}</span>
            </button>
          </div>

          <div class="history-sort-group" role="group" aria-label="Ordenación de partidas">
            <button class="history-pill-btn continent-pill ${this.currentSort === 'date' ? 'active' : ''}" data-sort="date">
              <span class="pill-icon">📅</span>
              <span class="pill-label">${t('sortDate')}</span>
            </button>
            <button class="history-pill-btn continent-pill ${this.currentSort === 'time' ? 'active' : ''}" data-sort="time">
              <span class="pill-icon">⚡</span>
              <span class="pill-label">${t('sortTime')}</span>
            </button>
          </div>
        </div>

        <!-- Tabla de Historial -->
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t('colDate')}</th>
                <th>${t('colTime')}</th>
                <th>${t('modalGuessed')}</th>
                <th>${t('colStatus')}</th>
                <th style="width: 80px; text-align: center;">Récord</th>
              </tr>
            </thead>
            <tbody>
              ${history.length === 0 ? `
                <tr>
                  <td colspan="5" class="empty-table-notice">${t('emptyHistory')}</td>
                </tr>
              ` : history.map(item => {
                const formattedDate = new Date(item.played_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return `
                  <tr>
                    <td style="color: var(--color-text-muted); font-size: 0.85rem;">${formattedDate}</td>
                    <td style="font-family: var(--font-mono); font-weight: 700; color: var(--color-accent-green);">
                      ${quizEngine.formatTime(item.time_seconds)}
                    </td>
                    <td>${item.countries_guessed} / ${item.total_countries}</td>
                    <td>
                      ${item.completed ? `
                        <span class="brand-badge" style="background-color: rgba(0, 245, 155, 0.15); border-color: var(--color-accent-green); color: var(--color-accent-green);">
                          ✓ ${t('statusCompleted')}
                        </span>
                      ` : `
                        <span class="brand-badge" style="background-color: rgba(245, 158, 11, 0.15); border-color: var(--color-warning); color: var(--color-warning);">
                          ${t('statusAbandoned')}
                        </span>
                      `}
                    </td>
                    <td style="text-align: center;">
                      ${item.is_personal_best ? '<span title="Nuevo Récord Personal">⭐</span>' : '—'}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Eventos de filtro
    this.container.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        this.currentFilter = target.getAttribute('data-filter') || 'all';
        this.fetchAndRender();
      });
    });

    // Eventos de orden
    this.container.querySelectorAll('[data-sort]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        this.currentSort = target.getAttribute('data-sort') || 'date';
        this.fetchAndRender();
      });
    });
  }
}
