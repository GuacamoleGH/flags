// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Modal de autenticación (Login / Registro) con selector de avatares.
 * @spec REQ-07
 */

import { t } from '../i18n';
import { apiService } from '../services/api.service';

const AVATAR_OPTIONS = [
  { id: 'flag-master', icon: '🚩', label: 'Flag Master' },
  { id: 'compass', icon: '🧭', label: 'Brújula' },
  { id: 'globe', icon: '🌍', label: 'Globo' },
  { id: 'explorer', icon: '🗺️', label: 'Explorador' },
  { id: 'falcon', icon: '🦅', label: 'Halcón' },
  { id: 'arcade', icon: '🕹️', label: 'Arcade' }
];

export function openAuthModal(initialMode: 'login' | 'register' = 'login', onSuccess?: () => void): void {
  const existing = document.getElementById('auth-modal-overlay');
  if (existing) existing.remove();

  let mode = initialMode;
  let selectedAvatar = 'flag-master';
  let errorMessage = '';

  const overlay = document.createElement('div');
  overlay.id = 'auth-modal-overlay';
  overlay.className = 'modal-overlay';

  function renderModalContent(): void {
    overlay.innerHTML = `
      <div class="modal-card">
        <button class="modal-close-btn" id="btn-close-modal" aria-label="Cerrar">✕</button>

        <div class="modal-header">
          <div class="modal-trophy-icon">${mode === 'login' ? '🔐' : '🚀'}</div>
          <h2 class="modal-title">${mode === 'login' ? t('authLoginTitle') : t('authRegisterTitle')}</h2>
          <p class="modal-subtitle">GuacamoleGH Flags</p>
        </div>

        ${errorMessage ? `<div class="form-error-msg">${errorMessage}</div>` : ''}

        <form id="auth-form">
          <div class="form-group">
            <label class="form-label" for="auth-username">${t('lblUsername')}</label>
            <input
              type="text"
              id="auth-username"
              class="form-input"
              required
              autocomplete="username"
              placeholder="Ej: flags_player"
              minlength="3"
              maxlength="24"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="auth-password">${t('lblPassword')}</label>
            <input
              type="password"
              id="auth-password"
              class="form-input"
              required
              autocomplete="${mode === 'login' ? 'current-password' : 'new-password'}"
              placeholder="••••••••"
              minlength="6"
            />
          </div>

          ${mode === 'register' ? `
            <div class="form-group">
              <label class="form-label">${t('lblAvatar')}</label>
              <div class="avatar-selector">
                ${AVATAR_OPTIONS.map(opt => `
                  <button
                    type="button"
                    class="avatar-opt-btn ${selectedAvatar === opt.id ? 'active' : ''}"
                    data-avatar="${opt.id}"
                    title="${opt.label}"
                  >
                    ${opt.icon}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="margin-top: 20px;">
            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; height: 42px;">
              ${mode === 'login' ? t('btnLoginSubmit') : t('btnRegisterSubmit')}
            </button>
          </div>

          <a href="#" class="form-toggle-link" id="btn-toggle-auth-mode">
            ${mode === 'login' ? t('needAccount') : t('alreadyAccount')}
          </a>
        </form>
      </div>
    `;

    // Eventos
    overlay.querySelector('#btn-close-modal')?.addEventListener('click', () => overlay.remove());

    overlay.querySelector('#btn-toggle-auth-mode')?.addEventListener('click', (e) => {
      e.preventDefault();
      mode = mode === 'login' ? 'register' : 'login';
      errorMessage = '';
      renderModalContent();
    });

    if (mode === 'register') {
      overlay.querySelectorAll('.avatar-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          selectedAvatar = target.getAttribute('data-avatar') || 'flag-master';
          overlay.querySelectorAll('.avatar-opt-btn').forEach(b => b.classList.remove('active'));
          target.classList.add('active');
        });
      });
    }

    const form = overlay.querySelector('#auth-form') as HTMLFormElement;
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usernameInput = overlay.querySelector('#auth-username') as HTMLInputElement;
      const passwordInput = overlay.querySelector('#auth-password') as HTMLInputElement;
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

      const cleanUsername = usernameInput.value.trim();
      const cleanPassword = passwordInput.value;

      errorMessage = '';
      submitBtn.disabled = true;
      submitBtn.textContent = '...';

      try {
        if (mode === 'login') {
          await apiService.login(cleanUsername, cleanPassword);
        } else {
          await apiService.register(cleanUsername, cleanPassword, selectedAvatar);
        }
        overlay.remove();
        if (onSuccess) onSuccess();
      } catch (err: any) {
        errorMessage = err.message || 'Error de autenticación';
        renderModalContent();
      }
    });
  }

  renderModalContent();
  document.body.appendChild(overlay);

  // Foco inicial
  setTimeout(() => {
    (overlay.querySelector('#auth-username') as HTMLInputElement)?.focus();
  }, 100);
}
