// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Vista del Quiz con panel centralizado, botones de modo sin iconos,
 * cambio dinámico de botones de acción y banderas con renderizado limpio.
 * @spec REQ-02, REQ-03, REQ-04, REQ-05
 */

import { COUNTRIES_BY_CODE } from '../data/countries.data';
import { quizEngine, type QuizState, type QuizGameMode } from './QuizEngine';
import { t, getLanguage } from '../common/i18n';
import { apiService, type ScoreSubmissionResult } from '../common/services/api.service';
import { openAuthModal } from '../common/components/AuthModal';

export class QuizView {
  private container: HTMLElement;
  private unsubscribeEngine?: () => void;
  private currentScoreResult: ScoreSubmissionResult | null = null;
  private resultModalOpen = false;
  private lastRenderedStatus: string = '';

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'quiz-page-view';
  }

  public mount(target: HTMLElement): void {
    target.appendChild(this.container);
    this.render();

    this.unsubscribeEngine = quizEngine.subscribe((state) => {
      this.updateHud(state);
      this.updateActiveFlagCard(state);

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
    const activeCountry = quizEngine.getActiveCountry();
    this.lastRenderedStatus = state.status;

    this.container.innerHTML = `
      <div class="site-container">
        <!-- Selector de Modo de Juego (Sin iconos en los botones) -->
        <div class="game-mode-selector-bar">
          <span class="mode-bar-label">${t('lblGameMode')}:</span>
          <div class="mode-pills-wrap">
            <button class="mode-pill-btn ${state.gameMode === 'world' ? 'active' : ''}" data-mode="world">
              ${t('modeWorld')}
            </button>
            <button class="mode-pill-btn ${state.gameMode === 'europe' ? 'active' : ''}" data-mode="europe">
              ${t('modeEurope')}
            </button>
            <button class="mode-pill-btn ${state.gameMode === 'asia' ? 'active' : ''}" data-mode="asia">
              ${t('modeAsia')}
            </button>
            <button class="mode-pill-btn ${state.gameMode === 'africa' ? 'active' : ''}" data-mode="africa">
              ${t('modeAfrica')}
            </button>
            <button class="mode-pill-btn ${state.gameMode === 'americas' ? 'active' : ''}" data-mode="americas">
              ${t('modeAmericas')}
            </button>
            <button class="mode-pill-btn ${state.gameMode === 'oceania' ? 'active' : ''}" data-mode="oceania">
              ${t('modeOceania')}
            </button>
          </div>
        </div>

        <!-- Barra de Control Centralizada y Fija -->
        <div class="active-quiz-control-bar" id="active-quiz-bar">
          <div class="control-bar-centered-content">
            <!-- Vista Previa de la Bandera Activa -->
            <div class="active-flag-preview-box" id="active-flag-preview" title="Bandera actual a responder">
              <img
                id="active-flag-img"
                src="${activeCountry.flagUrl}"
                alt="Bandera a responder"
                class="active-flag-img"
              />
            </div>

            <!-- Botón Anterior (Grande) -->
            <button class="nav-flag-btn large-nav-btn" id="btn-flag-prev" title="${t('btnPrev')}">
              ${t('btnPrev')}
            </button>

            <!-- Campo Principal de Entrada -->
            <div class="active-input-container">
              <label class="active-input-label" for="active-country-input">
                ${t('lblEnterCountry')}
              </label>
              <input
                type="text"
                id="active-country-input"
                class="active-country-input"
                placeholder="${t('placeholderAnswer')}"
                autocomplete="off"
                autofocus
                spellcheck="false"
              />
            </div>

            <!-- Botón Siguiente (Grande) -->
            <button class="nav-flag-btn large-nav-btn" id="btn-flag-next" title="${t('btnNext')}">
              ${t('btnNext')}
            </button>

            <!-- Estadísticas y Temporizador -->
            <div class="quiz-top-stats">
              <div class="top-stat-item">
                <span class="top-stat-label">${t('lblProgress')}</span>
                <span class="top-stat-number" id="top-score-display">
                  ${state.guessedCodes.size}/${state.totalInMode}
                </span>
              </div>

              <div class="top-stat-item">
                <span class="top-stat-label">${t('lblTime')}</span>
                <span class="top-stat-timer" id="top-timer-display">
                  ${quizEngine.formatTime(state.elapsedSeconds)}
                </span>
              </div>

              <div class="top-actions-wrap" id="top-actions-container">
                ${this.renderActionsHtml(state.status)}
              </div>
            </div>
          </div>
        </div>

        <!-- Cuadrícula Matricial de Banderas -->
        <div class="flags-matrix-grid" id="flags-matrix-grid"></div>
      </div>
    `;

    this.bindControls();
    this.renderFlagsMatrix();
    this.focusInput();
  }

  private renderActionsHtml(status: string): string {
    if (status === 'running') {
      return `
        <button class="btn-link-danger" id="btn-action-giveup">${t('btnGiveUp')}</button>
        <button class="btn-link-subtle" id="btn-action-restart">${t('btnRestart')}</button>
      `;
    }
    if (status === 'completed' || status === 'abandoned') {
      return `
        <button class="btn-primary" id="btn-action-again" style="padding: 8px 16px; font-size: 0.9rem;">
          ↺ ${t('btnPlayAgain')}
        </button>
      `;
    }
    return `
      <button class="btn-primary" id="btn-action-start" style="padding: 8px 16px; font-size: 0.9rem;">
        ▶ ${t('btnStart')}
      </button>
    `;
  }

  private bindControls(): void {
    const input = this.container.querySelector('#active-country-input') as HTMLInputElement;

    // Selector de modo de juego
    this.container.querySelectorAll('.mode-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const mode = target.getAttribute('data-mode') as QuizGameMode;
        if (mode) {
          quizEngine.setGameMode(mode);
          this.render();
        }
      });
    });

    const handleAnswerSubmission = () => {
      const val = input.value.trim();
      if (!val) return;

      const isCorrect = quizEngine.submitActiveAnswer(val);
      if (isCorrect) {
        input.value = '';
        input.classList.add('flash-success');
        setTimeout(() => input.classList.remove('flash-success'), 250);
      }
    };

    input?.addEventListener('keydown', (e) => {
      quizEngine.ensureRunningOnTyping();

      if (e.key === 'Enter') {
        e.preventDefault();
        handleAnswerSubmission();
      } else if (e.key === 'ArrowRight' && (e.ctrlKey || e.altKey || input.value === '')) {
        e.preventDefault();
        quizEngine.nextFlag();
      } else if (e.key === 'ArrowLeft' && (e.ctrlKey || e.altKey || input.value === '')) {
        e.preventDefault();
        quizEngine.prevFlag();
      }
    });

    input?.addEventListener('input', () => {
      quizEngine.ensureRunningOnTyping();
      handleAnswerSubmission();
    });

    this.container.querySelector('#btn-flag-prev')?.addEventListener('click', () => {
      quizEngine.prevFlag();
      this.focusInput();
    });

    this.container.querySelector('#btn-flag-next')?.addEventListener('click', () => {
      quizEngine.nextFlag();
      this.focusInput();
    });

    this.bindActionButtons();
  }

  private bindActionButtons(): void {
    this.container.querySelector('#btn-action-giveup')?.addEventListener('click', () => {
      quizEngine.giveUp();
      this.render();
    });

    this.container.querySelector('#btn-action-restart')?.addEventListener('click', () => {
      quizEngine.restart();
      this.render();
      this.focusInput();
    });

    this.container.querySelector('#btn-action-start')?.addEventListener('click', () => {
      quizEngine.start();
      this.render();
      this.focusInput();
    });

    this.container.querySelector('#btn-action-again')?.addEventListener('click', () => {
      quizEngine.restart();
      quizEngine.start();
      this.render();
      this.focusInput();
    });
  }

  private renderFlagsMatrix(): void {
    const grid = this.container.querySelector('#flags-matrix-grid');
    if (!grid) return;

    const state = quizEngine.getSnapshot();
    const lang = getLanguage();

    grid.innerHTML = state.shuffledCodes.map(code => {
      const c = COUNTRIES_BY_CODE.get(code);
      if (!c) return '';

      const isGuessed = state.guessedCodes.has(code);
      const isRevealed = !isGuessed && state.revealedRemaining;
      const isActive = state.activeCode === code;
      const displayName = lang === 'es' ? c.nameEs : c.nameEn;

      let cellClass = 'matrix-flag-cell';
      if (isActive) cellClass += ' active-target';
      if (isGuessed) cellClass += ' guessed-correct';
      if (isRevealed) cellClass += ' revealed-missed';

      return `
        <div
          class="${cellClass}"
          id="flag-cell-${code}"
          data-code="${code}"
          title="${isGuessed || isRevealed ? displayName : 'Haz clic para seleccionar esta bandera'}"
        >
          <div class="matrix-flag-wrap">
            <img
              class="matrix-flag-img"
              src="${c.flagUrl}"
              alt="Bandera de ${displayName}"
              loading="lazy"
            />
          </div>
          <div class="matrix-flag-label">
            ${isGuessed ? `✓ ${displayName}` : isRevealed ? displayName : '&nbsp;'}
          </div>
        </div>
      `;
    }).join('');

    // Permitir hacer clic en cualquier bandera para seleccionarla
    grid.querySelectorAll('.matrix-flag-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const code = cell.getAttribute('data-code');
        if (code) {
          quizEngine.setActiveCode(code);
          this.focusInput();
        }
      });
    });
  }

  private updateActiveFlagCard(state: QuizState): void {
    const activeCountry = quizEngine.getActiveCountry();

    // Actualizar imagen superior
    const previewImg = this.container.querySelector('#active-flag-img') as HTMLImageElement;
    if (previewImg && previewImg.getAttribute('src') !== activeCountry.flagUrl) {
      previewImg.src = activeCountry.flagUrl;
      previewImg.alt = `Bandera actual`;
    }

    // Actualizar clase activa en la cuadrícula sin scroll
    this.container.querySelectorAll('.matrix-flag-cell.active-target').forEach(c => {
      c.classList.remove('active-target');
    });

    const activeCell = this.container.querySelector(`#flag-cell-${state.activeCode}`);
    if (activeCell) {
      activeCell.classList.add('active-target');
    }

    // Actualizar banderas acertadas en la cuadrícula
    const lang = getLanguage();
    state.guessedCodes.forEach(code => {
      const cell = this.container.querySelector(`#flag-cell-${code}`);
      if (cell && !cell.classList.contains('guessed-correct')) {
        cell.classList.add('guessed-correct');
        const c = COUNTRIES_BY_CODE.get(code);
        const label = cell.querySelector('.matrix-flag-label');
        if (label && c) {
          const name = lang === 'es' ? c.nameEs : c.nameEn;
          label.textContent = `✓ ${name}`;
        }
      }
    });
  }

  private updateHud(state: QuizState): void {
    const scoreVal = this.container.querySelector('#top-score-display');
    if (scoreVal) scoreVal.textContent = `${state.guessedCodes.size}/${state.totalInMode}`;

    const timerVal = this.container.querySelector('#top-timer-display');
    if (timerVal) timerVal.textContent = quizEngine.formatTime(state.elapsedSeconds);

    // Si el estado de juego ha cambiado (ej. de idle a running al empezar a escribir),
    // actualizar inmediatamente los botones de acción sin que siga apareciendo "Start Quiz"
    if (this.lastRenderedStatus !== state.status) {
      this.lastRenderedStatus = state.status;
      const actionsContainer = this.container.querySelector('#top-actions-container');
      if (actionsContainer) {
        actionsContainer.innerHTML = this.renderActionsHtml(state.status);
        this.bindActionButtons();
      }
    }
  }

  private focusInput(): void {
    setTimeout(() => {
      const input = this.container.querySelector('#active-country-input') as HTMLInputElement;
      input?.focus();
    }, 50);
  }

  private async handleGameFinished(state: QuizState): Promise<void> {
    this.resultModalOpen = true;

    try {
      this.currentScoreResult = await apiService.submitScore({
        timeSeconds: state.elapsedSeconds,
        countriesGuessed: state.guessedCodes.size,
        totalCountries: state.totalInMode,
        gameMode: state.gameMode,
        completed: state.status === 'completed',
        language: getLanguage()
      });

      if (this.currentScoreResult.guest && state.status === 'completed') {
        quizEngine.setGuestBestTime(state.gameMode, state.elapsedSeconds);
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
    const accuracy = Math.round((state.guessedCodes.size / state.totalInMode) * 100);
    const guestPB = quizEngine.getGuestBestTime(state.gameMode);
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
            <div class="modal-stat-num">${state.guessedCodes.size} / ${state.totalInMode}</div>
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
            ${this.currentScoreResult?.rank ? `(Puesto #${this.currentScoreResult.rank} en ${state.gameMode})` : ''}
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
