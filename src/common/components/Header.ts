// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Componente de cabecera con navegación SPA, selector de idioma,
 * selector de tema con icono SVG (sol/luna) y bloqueo de idioma durante la partida.
 * @spec REQ-01, REQ-06, REQ-07
 */

import { t, getLanguage, setLanguage, getTheme, toggleTheme } from '../i18n';
import { apiService } from '../services/api.service';
import { quizEngine } from '../../quiz/QuizEngine';

const SUN_SVG = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"></circle>
  <line x1="12" y1="1" x2="12" y2="3"></line>
  <line x1="12" y1="21" x2="12" y2="23"></line>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
  <line x1="1" y1="12" x2="3" y2="12"></line>
  <line x1="21" y1="12" x2="23" y2="12"></line>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
</svg>
`;

const MOON_SVG = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
</svg>
`;

export function renderHeader(activeRoute: string, onOpenAuth: () => void): HTMLElement {
  const header = document.createElement('header');
  header.className = 'site-header';

  const user = apiService.getCurrentUser();
  const currentLang = getLanguage();
  const currentTheme = getTheme();
  const isRunning = quizEngine.getSnapshot().status === 'running';

  header.innerHTML = `
    <div class="site-container header-content">
      <a href="#quiz" class="brand-link">
        <span class="brand-logo-icon">🚩</span>
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
        <!-- Selector de Tema Claro / Oscuro con Icono SVG exacto -->
        <button
          class="theme-toggle-btn"
          id="btn-theme-toggle"
          title="${currentTheme === 'dark' ? t('themeLight') : t('themeDark')}"
          aria-label="Cambiar tema"
        >
          ${currentTheme === 'dark' ? SUN_SVG : MOON_SVG}
        </button>

        <!-- Selector de Idioma (Bloqueado durante la partida) -->
        <div class="lang-switcher ${isRunning ? 'lang-locked' : ''}" title="${isRunning ? 'No puedes cambiar de idioma durante una partida activa' : ''}">
          <button
            class="lang-btn ${currentLang === 'es' ? 'active' : ''}"
            data-lang="es"
            ${isRunning ? 'disabled' : ''}
          >
            ES
          </button>
          <button
            class="lang-btn ${currentLang === 'en' ? 'active' : ''}"
            data-lang="en"
            ${isRunning ? 'disabled' : ''}
          >
            EN
          </button>
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

  // Toggle tema
  header.querySelector('#btn-theme-toggle')?.addEventListener('click', () => {
    toggleTheme();
  });

  // Selector de idioma (solo permitido si NO está corriendo la partida)
  if (!isRunning) {
    header.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const lang = target.getAttribute('data-lang') as 'es' | 'en';
        if (lang) setLanguage(lang);
      });
    });
  }

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
