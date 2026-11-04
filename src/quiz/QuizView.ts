// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Vista principal del Quiz de Banderas con cuadrícula horizontal responsive y HUD interactivo.
 * @spec REQ-02, REQ-03, REQ-04, REQ-05
 */

import { COUNTRIES, COUNTRIES_BY_CODE } from '../data/countries.data';
import type { Country } from '../common/types/country';
import { quizEngine, type QuizState } from './QuizEngine';
import { t, getLanguage } from '../common/i18n';
import { apiService, type ScoreSubmissionResult } from '../common/services/api.service';
import { openAuthModal } from '../common/components/AuthModal';

export class QuizView {
  private container: HTMLElement;
  private unsubscribeEngine?: () => void;
  private selectedContinent = 'all';
  private searchQuery = '';
  private currentScoreResult: ScoreSubmissionResult | null = null;
  private resultModalOpen = false;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'quiz-page-view';
  }

  public mount(target: HTMLElement): void {
    target.appendChild(this.container);
    this.render();

    this.unsubscribeEngine = quizEngine.subscribe((state) => {
      this.updateHud(state);

      if (state.status === 'completed' || state.status === 'abandoned') {
        if (!this.resultModalOpen) {
          this.handleGameFinished(state);
        }
      }
    });
  }

  public unmount(): void {
    if (this.unsubscribeEngine) {
      this.unsubscribeEngine();
      this.unsubscribeEngine = undefined;
    }
    this.container.remove();
  }

  private render(): void {
    const state = quizEngine.getSnapshot();

    this.container.innerHTML = `
      <div class="site-container">
        <!-- HUD Principal -->
        <div class="quiz-hud-bar" id="quiz-hud">
          <div class="hud-left">
            <div class="hud-timer-badge">
              <span>⏱️</span>
              <span id="hud-timer-val">${quizEngine.formatTime(state.elapsedSeconds)}</span>
            </div>

            <div class="hud-stat-box">
              <span class="hud-stat-label">${t('lblProgress')}</span>
              <div class="hud-stat-value" id="hud-progress-val">
                <span>${state.guessedCodes.size}</span> / 196
                <small style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: normal;">
                  (${Math.round((state.guessedCodes.size / 196) * 100)}%)
                </small>
              </div>
            </div>

            <div class="hud-stat-box">
              <span class="hud-stat-label">${t('lblPending')}</span>
              <div class="hud-stat-value" id="hud-pending-val">${196 - state.guessedCodes.size}</div>
            </div>
          </div>

          <div class="hud-right">
            ${state.status === 'idle' ? `
              <button class="btn-primary" id="btn-quiz-start">▶ ${t('btnStart')}</button>
            ` : ''}

            ${state.status === 'running' ? `
              <button class="btn-danger" id="btn-quiz-giveup">${t('btnGiveUp')}</button>
              <button class="btn-outline" id="btn-quiz-restart">${t('btnRestart')}</button>
            ` : ''}

            ${state.status === 'completed' || state.status === 'abandoned' ? `
              <button class="btn-primary" id="btn-quiz-again">↺ ${t('btnPlayAgain')}</button>
            ` : ''}
          </div>
        </div>

        <!-- Barra de Filtros y Búsqueda Horizontal -->
        <div class="quiz-filter-bar">
          <div class="continent-pills">
            <button class="continent-pill ${this.selectedContinent === 'all' ? 'active' : ''}" data-continent="all">${t('continentAll')}</button>
            <button class="continent-pill ${this.selectedContinent === 'Europa' ? 'active' : ''}" data-continent="Europa">${t('continentEurope')}</button>
            <button class="continent-pill ${this.selectedContinent === 'Asia' ? 'active' : ''}" data-continent="Asia">${t('continentAsia')}</button>
            <button class="continent-pill ${this.selectedContinent === 'África' ? 'active' : ''}" data-continent="África">${t('continentAfrica')}</button>
            <button class="continent-pill ${this.selectedContinent === 'América' ? 'active' : ''}" data-continent="América">${t('continentAmericas')}</button>
            <button class="continent-pill ${this.selectedContinent === 'Oceanía' ? 'active' : ''}" data-continent="Oceanía">${t('continentOceania')}</button>
          </div>

          <input
            type="text"
            class="filter-search-input"
            id="filter-search-input"
            placeholder="${t('placeholderSearch')}"
            value="${this.searchQuery}"
          />
        </div>

        <!-- Cuadrícula Horizontal de Banderas -->
        <div class="flags-horizontal-grid" id="flags-grid"></div>
      </div>
    `;

    this.bindHudEvents();
    this.renderFlagsGrid();
  }

  private bindHudEvents(): void {
    this.container.querySelector('#btn-quiz-start')?.addEventListener('click', () => {
      quizEngine.start();
      this.render();
      this.focusFirstUnansweredInput();
    });

    this.container.querySelector('#btn-quiz-giveup')?.addEventListener('click', () => {
      quizEngine.giveUp();
      this.render();
    });

    this.container.querySelector('#btn-quiz-restart')?.addEventListener('click', () => {
      quizEngine.restart();
      this.render();
    });

    this.container.querySelector('#btn-quiz-again')?.addEventListener('click', () => {
      quizEngine.restart();
      quizEngine.start();
      this.render();
      this.focusFirstUnansweredInput();
    });

    // Píldoras de continentes
    this.container.querySelectorAll('.continent-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        this.selectedContinent = target.getAttribute('data-continent') || 'all';
        this.container.querySelectorAll('.continent-pill').forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        this.renderFlagsGrid();
      });
    });

    // Búsqueda
    const searchInput = this.container.querySelector('#filter-search-input') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
      this.renderFlagsGrid();
    });
  }

  private getFilteredCountries(): readonly Country[] {
    const lang = getLanguage();
    return COUNTRIES.filter(c => {
      // Filtro de continente
      if (this.selectedContinent !== 'all') {
        const cont = c.continentEs;
        if (this.selectedContinent === 'América' && !cont.includes('América')) return false;
        if (this.selectedContinent !== 'América' && cont !== this.selectedContinent) return false;
      }

      // Filtro de búsqueda
      if (this.searchQuery) {
        const nameActive = lang === 'es' ? c.nameEs.toLowerCase() : c.nameEn.toLowerCase();
        const code = c.code.toLowerCase();
        return nameActive.includes(this.searchQuery) || code.includes(this.searchQuery);
      }

      return true;
    });
  }

  private renderFlagsGrid(): void {
    const grid = this.container.querySelector('#flags-grid');
    if (!grid) return;

    const filtered = this.getFilteredCountries();
    const state = quizEngine.getSnapshot();
    const lang = getLanguage();

    grid.innerHTML = filtered.map(c => {
      const isGuessed = state.guessedCodes.has(c.code);
      const isRevealedMissed = !isGuessed && state.revealedRemaining;
      const countryDisplayName = lang === 'es' ? c.nameEs : c.nameEn;

      let cardClass = 'flag-card';
      if (isGuessed) cardClass += ' completed';
      if (isRevealedMissed) cardClass += ' revealed-missed';

      return `
        <div class="${cardClass}" id="card-${c.code}" data-code="${c.code}">
          <div class="flag-image-wrap">
            <img
              class="flag-img"
              src="${c.flagUrl}"
              alt="Bandera de ${countryDisplayName}"
              loading="lazy"
              width="240"
              height="160"
            />
          </div>

          <div class="flag-input-wrap">
            ${isGuessed ? `
              <div class="flag-completed-badge" title="${countryDisplayName}">
                ✓ ${countryDisplayName}
              </div>
            ` : isRevealedMissed ? `
              <div class="flag-revealed-badge" title="${countryDisplayName}">
                ${countryDisplayName}
              </div>
            ` : `
              <input
                type="text"
                class="flag-input"
                id="input-${c.code}"
                data-code="${c.code}"
                placeholder="${t('placeholderAnswer')}"
                autocomplete="off"
                spellcheck="false"
              />
            `}
          </div>
        </div>
      `;
    }).join('');

    this.bindGridInputEvents();
  }

  private bindGridInputEvents(): void {
    const inputs = this.container.querySelectorAll('.flag-input') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => {
      const code = input.getAttribute('data-code');
      if (!code) return;

      const handleCheck = () => {
        const val = input.value.trim();
        if (!val) return;

        const isCorrect = quizEngine.submitAnswerForCountry(code, val);
        if (isCorrect) {
          this.updateCardToCorrect(code);
          this.focusNextUnansweredInput(code);
        }
      };

      // Al pulsar Enter o al escribir
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCheck();
        }
      });

      input.addEventListener('input', () => {
        handleCheck();
      });
    });
  }

  private updateCardToCorrect(code: string): void {
    const card = this.container.querySelector(`#card-${code}`);
    const country = COUNTRIES_BY_CODE.get(code);
    if (!card || !country) return;

    const lang = getLanguage();
    const displayName = lang === 'es' ? country.nameEs : country.nameEn;

    card.classList.add('completed');
    const wrap = card.querySelector('.flag-input-wrap');
    if (wrap) {
      wrap.innerHTML = `
        <div class="flag-completed-badge" title="${displayName}">
          ✓ ${displayName}
        </div>
      `;
    }
  }

  private focusFirstUnansweredInput(): void {
    const firstInput = this.container.querySelector('.flag-input') as HTMLInputElement;
    if (firstInput) {
      firstInput.focus();
    }
  }

  private focusNextUnansweredInput(currentCode: string): void {
    const allInputs = Array.from(this.container.querySelectorAll('.flag-input')) as HTMLInputElement[];
    const currentIndex = allInputs.findIndex(inp => inp.getAttribute('data-code') === currentCode);

    if (currentIndex !== -1 && currentIndex + 1 < allInputs.length) {
      allInputs[currentIndex + 1]?.focus();
    } else if (allInputs.length > 0) {
      allInputs[0]?.focus();
    }
  }

  private updateHud(state: QuizState): void {
    const timerVal = this.container.querySelector('#hud-timer-val');
    if (timerVal) timerVal.textContent = quizEngine.formatTime(state.elapsedSeconds);

    const progressVal = this.container.querySelector('#hud-progress-val');
    if (progressVal) {
      progressVal.innerHTML = `
        <span>${state.guessedCodes.size}</span> / 196
        <small style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: normal;">
          (${Math.round((state.guessedCodes.size / 196) * 100)}%)
        </small>
      `;
    }

    const pendingVal = this.container.querySelector('#hud-pending-val');
    if (pendingVal) pendingVal.textContent = (196 - state.guessedCodes.size).toString();
  }

  private async handleGameFinished(state: QuizState): Promise<void> {
    this.resultModalOpen = true;

    // Enviar resultado a la API
    try {
      this.currentScoreResult = await apiService.submitScore({
        timeSeconds: state.elapsedSeconds,
        countriesGuessed: state.guessedCodes.size,
        completed: state.status === 'completed',
        language: getLanguage()
      });

      // Si es usuario invitado y completó el quiz, guardar récord en localStorage
      if (this.currentScoreResult.guest && state.status === 'completed') {
        quizEngine.setGuestBestTime(state.elapsedSeconds);
      }
    } catch (err) {
      console.error('[Score Submission Error]', err);
    }

    this.showResultsModal(state);
  }

  private showResultsModal(state: QuizState): void {
    const existing = document.getElementById('results-modal-overlay');
    if (existing) existing.remove();

    const isVictory = state.status === 'completed';
    const accuracy = Math.round((state.guessedCodes.size / 196) * 100);
    const guestPB = quizEngine.getGuestBestTime();
    const isPB = this.currentScoreResult?.isPersonalBest || (guestPB && guestPB === state.elapsedSeconds);

    const overlay = document.createElement('div');
    overlay.id = 'results-modal-overlay';
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
      <div class="modal-card">
        <button class="modal-close-btn" id="btn-close-results">✕</button>

        <div class="modal-header">
          <div class="modal-trophy-icon">${isVictory ? '🏆' : '🏁'}</div>
          <h2 class="modal-title">${isVictory ? t('modalVictoryTitle') : t('modalGameOverTitle')}</h2>
          <p class="modal-subtitle">GuacamoleGH Flags</p>
        </div>

        <div class="modal-stats-grid">
          <div class="modal-stat-box">
            <div class="modal-stat-num">${quizEngine.formatTime(state.elapsedSeconds)}</div>
            <div class="modal-stat-label">${t('modalTotalTime')}</div>
          </div>
          <div class="modal-stat-box">
            <div class="modal-stat-num">${state.guessedCodes.size} / 196</div>
            <div class="modal-stat-label">${t('modalGuessed')}</div>
          </div>
          <div class="modal-stat-box">
            <div class="modal-stat-num">${accuracy}%</div>
            <div class="modal-stat-label">${t('modalPercentage')}</div>
          </div>
        </div>

        ${isPB ? `
          <div class="modal-banner-pb">
            🎉 ${t('modalPersonalBest')}
            ${this.currentScoreResult?.rank ? `(Puesto #${this.currentScoreResult.rank} Global)` : ''}
          </div>
        ` : ''}

        ${(!apiService.getCurrentUser() && isVictory) ? `
          <div class="modal-banner-guest">
            ${t('modalGuestNotice')}
          </div>
        ` : ''}

        <div class="modal-actions">
          <button class="btn-primary" id="btn-modal-again">↺ ${t('btnPlayAgain')}</button>
          <a href="#leaderboard" class="btn-outline" id="btn-modal-leaderboard">${t('btnViewLeaderboard')}</a>
          ${!apiService.getCurrentUser() ? `
            <button class="btn-outline" id="btn-modal-login">${t('navLogin')}</button>
          ` : ''}
        </div>
      </div>
    `;

    overlay.querySelector('#btn-close-results')?.addEventListener('click', () => {
      overlay.remove();
      this.resultModalOpen = false;
    });

    overlay.querySelector('#btn-modal-again')?.addEventListener('click', () => {
      overlay.remove();
      this.resultModalOpen = false;
      quizEngine.restart();
      quizEngine.start();
      this.render();
      this.focusFirstUnansweredInput();
    });

    overlay.querySelector('#btn-modal-leaderboard')?.addEventListener('click', () => {
      overlay.remove();
      this.resultModalOpen = false;
      window.location.hash = '#leaderboard';
    });

    overlay.querySelector('#btn-modal-login')?.addEventListener('click', () => {
      overlay.remove();
      this.resultModalOpen = false;
      openAuthModal('login', () => {
        window.location.hash = '#leaderboard';
      });
    });

    document.body.appendChild(overlay);
  }
}
