// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Componente de cabecera con navegación SPA, selector de idioma y perfil.
 * @spec REQ-01, REQ-06, REQ-07
 */

import { t, getLanguage, setLanguage } from '../i18n';
import { apiService } from '../services/api.service';

export function renderHeader(activeRoute: string, onOpenAuth: () => void): HTMLElement {
  const header = document.createElement('header');
  header.className = 'site-header';

  const user = apiService.getCurrentUser();
  const currentLang = getLanguage();

  header.innerHTML = `
    <div class="site-container header-content">
      <a href="#quiz" class="brand-link">
        <div class="brand-logo-icon">🏳️</div>
        <span>${t('appTitle')}</span>
        <span class="brand-badge">196</span>
      </a>

      <nav class="header-nav">
        <a href="#quiz" class="nav-link ${activeRoute === 'quiz' ? 'active' : ''}">${t('navQuiz')}</a>
        <a href="#leaderboard" class="nav-link ${activeRoute === 'leaderboard' ? 'active' : ''}">${t('navLeaderboard')}</a>
        ${user ? `<a href="#history" class="nav-link ${activeRoute === 'history' ? 'active' : ''}">${t('navHistory')}</a>` : ''}
        ${user ? `<a href="#profile" class="nav-link ${activeRoute.startsWith('profile') ? 'active' : ''}">${t('navProfile')}</a>` : ''}
      </nav>

      <div class="header-actions">
        <!-- Selector de Idioma -->
        <div class="lang-switcher">
          <button class="lang-btn ${currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
          <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        </div>

        <!-- Usuario / Iniciar Sesión -->
        ${user ? `
          <a href="#profile" class="user-pill" title="${t('navProfile')}">
            <span class="user-avatar-tiny">${getAvatarIcon(user.avatar)}</span>
            <span class="user-name-text">${escapeHtml(user.username)}</span>
          </a>
          <button class="btn-outline" id="btn-header-logout" style="padding: 4px 10px; font-size: 0.8rem;">${t('navLogout')}</button>
        ` : `
          <button class="btn-primary" id="btn-header-login" style="padding: 6px 14px; font-size: 0.85rem;">
            ${t('navLogin')}
          </button>
        `}
      </div>
    </div>
  `;

  // Eventos de botones
  header.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const lang = target.getAttribute('data-lang') as 'es' | 'en';
      if (lang) setLanguage(lang);
    });
  });

  const loginBtn = header.querySelector('#btn-header-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', onOpenAuth);
  }

  const logoutBtn = header.querySelector('#btn-header-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await apiService.logout();
      window.location.hash = '#quiz';
    });
  }

  return header;
}

export function getAvatarIcon(avatar: string): string {
  switch (avatar) {
    case 'compass': return '🧭';
    case 'globe': return '🌍';
    case 'explorer': return '🗺️';
    case 'falcon': return '🦅';
    case 'arcade': return '🕹️';
    case 'flag-master':
    default: return '🚩';
  }
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
