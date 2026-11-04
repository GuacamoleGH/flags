// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Punto de entrada de la aplicación, router SPA y orquestador reactivo.
 * @spec REQ-01, REQ-02, REQ-06, REQ-07, REQ-08, REQ-09, REQ-10
 */

import './common/styles/main.css';
import { renderHeader } from './common/components/Header';
import { QuizView } from './quiz/QuizView';
import { LeaderboardView } from './common/components/LeaderboardView';
import { ProfileView } from './common/components/ProfileView';
import { HistoryView } from './common/components/HistoryView';
import { openAuthModal } from './common/components/AuthModal';
import { onLanguageChange } from './common/i18n';
import { apiService } from './common/services/api.service';
import { quizEngine } from './quiz/QuizEngine';

class AppRouter {
  private appElement: HTMLElement;
  private headerSlot: HTMLElement;
  private viewSlot: HTMLElement;
  private footerSlot: HTMLElement;
  private currentViewInstance: any = null;
  private persistentQuizView: QuizView;

  constructor() {
    const el = document.getElementById('app');
    if (!el) throw new Error('Missing #app root element');
    this.appElement = el;

    this.headerSlot = document.createElement('div');
    this.viewSlot = document.createElement('main');
    this.viewSlot.className = 'main-content';
    this.footerSlot = document.createElement('footer');
    this.footerSlot.className = 'site-footer';

    this.appElement.appendChild(this.headerSlot);
    this.appElement.appendChild(this.viewSlot);
    this.appElement.appendChild(this.footerSlot);

    // Mantenemos la instancia del quiz viva en memoria para que no se resetee el progreso
    this.persistentQuizView = new QuizView();

    this.init();
  }

  private async init(): Promise<void> {
    // Verificar sesión existente con el backend
    await apiService.checkAuth();

    // Enrutamiento hash
    window.addEventListener('hashchange', () => this.handleRoute());

    // Cambios de idioma (reactividad sin perder progreso)
    onLanguageChange(() => {
      this.updateHeader();
      this.updateFooter();
      this.handleRoute(true);
    });

    // Cambios de usuario
    apiService.onUserChange(() => {
      this.updateHeader();
      this.handleRoute(true);
    });

    // Bloqueo dinámico del selector de idioma al empezar partida
    let lastRunningState = false;
    quizEngine.subscribe((state) => {
      const isRunning = state.status === 'running';
      if (isRunning !== lastRunningState) {
        lastRunningState = isRunning;
        this.updateHeader();
      }
    });

    this.updateHeader();
    this.updateFooter();
    this.handleRoute();
  }

  private updateHeader(): void {
    const rawHash = window.location.hash.slice(1) || 'quiz';
    const activeRoute = rawHash.split('/')[0] || 'quiz';
    this.headerSlot.innerHTML = '';
    this.headerSlot.appendChild(renderHeader(activeRoute, () => openAuthModal('login', () => this.handleRoute(true))));
  }

  private updateFooter(): void {
    this.footerSlot.innerHTML = `
      <div class="site-container">
        <p>
          <strong>GuacamoleGH Flags</strong> · 196 Países Oficiales del Mundo · Homelab Soberano
        </p>
        <p style="margin-top: 6px; font-size: 0.8rem; color: var(--color-text-muted);">
          <a href="https://github.com/GuacamoleGH/flags" target="_blank" rel="noopener">Código en GitHub</a> ·
          <a href="https://github.com/GuacamoleGH/games" target="_blank" rel="noopener">GuacamoleGH Games</a> ·
          Built with <a href="https://github.com/davidbuenov/dbv-specs-ops" target="_blank" rel="noopener">dbv-specs-ops</a>
        </p>
      </div>
    `;
  }

  private handleRoute(forceReload = false): void {
    const rawHash = window.location.hash.slice(1) || 'quiz';
    const parts = rawHash.split('/');
    const route = parts[0] || 'quiz';
    const param = parts[1];

    this.updateHeader();

    if (route === 'quiz') {
      if (this.currentViewInstance !== this.persistentQuizView || forceReload) {
        this.clearCurrentView();
        this.persistentQuizView.mount(this.viewSlot);
        this.currentViewInstance = this.persistentQuizView;
      }
      return;
    }

    this.clearCurrentView();

    switch (route) {
      case 'leaderboard': {
        const view = new LeaderboardView();
        view.mount(this.viewSlot);
        this.currentViewInstance = view;
        break;
      }
      case 'profile': {
        const view = new ProfileView(param);
        view.mount(this.viewSlot);
        this.currentViewInstance = view;
        break;
      }
      case 'history': {
        const user = apiService.getCurrentUser();
        if (!user) {
          openAuthModal('login', () => this.handleRoute(true));
          window.location.hash = '#quiz';
          return;
        }
        const view = new HistoryView();
        view.mount(this.viewSlot);
        this.currentViewInstance = view;
        break;
      }
      default: {
        window.location.hash = '#quiz';
        break;
      }
    }
  }

  private clearCurrentView(): void {
    if (this.currentViewInstance) {
      this.currentViewInstance.unmount();
      this.currentViewInstance = null;
    }
    this.viewSlot.innerHTML = '';
  }
}

// Inicializar la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  new AppRouter();
});
