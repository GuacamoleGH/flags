// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Vista SPA de Perfil de Jugador (público y privado).
 * @spec REQ-09
 */

import { t } from '../i18n';
import { apiService, type UserProfileResponse } from '../services/api.service';
import { getAvatarIcon, escapeHtml } from './Header';
import { quizEngine } from '../../quiz/QuizEngine';

const AVATAR_OPTIONS = [
  { id: 'flag-master', icon: '🚩', label: 'Flag Master' },
  { id: 'compass', icon: '🧭', label: 'Brújula' },
  { id: 'globe', icon: '🌍', label: 'Globo' },
  { id: 'explorer', icon: '🗺️', label: 'Explorador' },
  { id: 'falcon', icon: '🦅', label: 'Halcón' },
  { id: 'arcade', icon: '🕹️', label: 'Arcade' }
];

export class ProfileView {
  private container: HTMLElement;
  private username: string;

  constructor(username?: string) {
    this.container = document.createElement('div');
    this.container.className = 'profile-page-view';
    const currentUser = apiService.getCurrentUser();
    this.username = username || currentUser?.username || '';
  }

  public async mount(target: HTMLElement): Promise<void> {
    target.appendChild(this.container);

    if (!this.username) {
      this.container.innerHTML = `
        <div class="site-container" style="text-align: center; padding: 60px 0;">
          <h2>Inicia sesión para ver tu perfil</h2>
          <a href="#quiz" class="btn-primary" style="margin-top: 16px;">Ir al Quiz</a>
        </div>
      `;
      return;
    }

    try {
      const data = await apiService.getUserProfile(this.username);
      this.render(data);
    } catch (err: any) {
      this.container.innerHTML = `
        <div class="site-container">
          <div class="form-error-msg" style="max-width: 600px; margin: 40px auto; text-align: center;">
            ${err.message || 'Error al cargar el perfil de usuario.'}
          </div>
        </div>
      `;
    }
  }

  public unmount(): void {
    this.container.remove();
  }

  private render(data: UserProfileResponse): void {
    const { user, stats, recentMatches, isOwner } = data;
    const memberSince = new Date(user.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const completionRate = stats.totalPlayed > 0
      ? Math.round((stats.totalCompleted / stats.totalPlayed) * 100)
      : 0;

    this.container.innerHTML = `
      <div class="site-container" style="max-width: 900px; margin: 0 auto; padding-bottom: 60px;">
        <!-- Cabecera del Perfil -->
        <div style="background-color: var(--color-bg-base); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 32px; margin-top: 24px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="font-size: 3.5rem; width: 80px; height: 80px; background-color: var(--color-surface-card); border: 2px solid var(--color-border-subtle); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center;" id="profile-avatar-display">
              ${getAvatarIcon(user.avatar)}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h1 style="font-size: 1.8rem; font-weight: 800;">${escapeHtml(user.username)}</h1>
                ${isOwner ? '<span class="brand-badge">Tú</span>' : ''}
              </div>
              <p style="color: var(--color-text-muted); font-size: 0.85rem; margin-top: 4px;">
                ${t('lblMemberSince')} ${memberSince}
              </p>
            </div>
          </div>

          ${isOwner ? `
            <div>
              <button class="btn-outline" id="btn-toggle-avatar-editor">✏️ ${t('lblEditAvatar')}</button>
            </div>
          ` : ''}
        </div>

        <!-- Editor de Avatar (solo propietario) -->
        ${isOwner ? `
          <div id="avatar-editor-section" style="display: none; background-color: var(--color-surface-card); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px;">
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 12px;">${t('lblEditAvatar')}</h3>
            <div class="avatar-selector">
              ${AVATAR_OPTIONS.map(opt => `
                <button
                  type="button"
                  class="avatar-opt-btn ${user.avatar === opt.id ? 'active' : ''}"
                  data-avatar="${opt.id}"
                  title="${opt.label}"
                >
                  ${opt.icon}
                </button>
              `).join('')}
            </div>
            <div style="margin-top: 16px;">
              <button class="btn-primary" id="btn-save-avatar" style="padding: 6px 16px; font-size: 0.85rem;">
                ${t('btnSaveProfile')}
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Tarjetas de Estadísticas -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 32px;">
          <div class="modal-stat-box">
            <div class="modal-stat-num">
              ${stats.bestTimeSeconds ? quizEngine.formatTime(stats.bestTimeSeconds) : '—'}
            </div>
            <div class="modal-stat-label">${t('lblBestTime')}</div>
          </div>

          <div class="modal-stat-box">
            <div class="modal-stat-num" style="color: var(--color-accent-turquoise);">
              ${stats.globalRank ? `#${stats.globalRank}` : '—'}
            </div>
            <div class="modal-stat-label">${t('lblBestTime')} (Rank)</div>
          </div>

          <div class="modal-stat-box">
            <div class="modal-stat-num">${stats.totalCompleted}</div>
            <div class="modal-stat-label">${t('lblCompletedCount')}</div>
          </div>

          <div class="modal-stat-box">
            <div class="modal-stat-num">${stats.totalPlayed}</div>
            <div class="modal-stat-label">${t('lblPlayedCount')} (${completionRate}%)</div>
          </div>
        </div>

        <!-- Historial Reciente -->
        <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 16px;">Partidas Recientes</h2>
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t('colDate')}</th>
                <th>${t('colTime')}</th>
                <th>${t('modalGuessed')}</th>
                <th>${t('colStatus')}</th>
              </tr>
            </thead>
            <tbody>
              ${recentMatches.length === 0 ? `
                <tr>
                  <td colspan="4" class="empty-table-notice">No hay partidas registradas todavía.</td>
                </tr>
              ` : recentMatches.map(m => `
                <tr>
                  <td style="color: var(--color-text-muted); font-size: 0.85rem;">
                    ${new Date(m.played_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style="font-family: var(--font-mono); font-weight: 700;">
                    ${quizEngine.formatTime(m.time_seconds)}
                  </td>
                  <td>
                    ${m.countries_guessed} / ${m.total_countries}
                  </td>
                  <td>
                    ${m.completed ? `
                      <span class="brand-badge" style="background-color: rgba(0, 245, 155, 0.15); border-color: var(--color-accent-green); color: var(--color-accent-green);">
                        ✓ ${t('statusCompleted')}
                      </span>
                    ` : `
                      <span class="brand-badge" style="background-color: rgba(245, 158, 11, 0.15); border-color: var(--color-warning); color: var(--color-warning);">
                        ${t('statusAbandoned')}
                      </span>
                    `}
                    ${m.is_personal_best ? ' <span title="Récord Personal">⭐</span>' : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    if (isOwner) {
      const toggleBtn = this.container.querySelector('#btn-toggle-avatar-editor');
      const editorSection = this.container.querySelector('#avatar-editor-section') as HTMLElement;
      let chosenAvatar = user.avatar;

      toggleBtn?.addEventListener('click', () => {
        editorSection.style.display = editorSection.style.display === 'none' ? 'block' : 'none';
      });

      this.container.querySelectorAll('.avatar-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          chosenAvatar = target.getAttribute('data-avatar') || 'flag-master';
          this.container.querySelectorAll('.avatar-opt-btn').forEach(b => b.classList.remove('active'));
          target.classList.add('active');
        });
      });

      this.container.querySelector('#btn-save-avatar')?.addEventListener('click', async () => {
        try {
          await apiService.updateAvatar(chosenAvatar);
          const display = this.container.querySelector('#profile-avatar-display');
          if (display) display.textContent = getAvatarIcon(chosenAvatar);
          editorSection.style.display = 'none';
        } catch (err: any) {
          alert(err.message || 'Error al guardar avatar');
        }
      });
    }
  }
}
