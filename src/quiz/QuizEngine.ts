// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Motor de estado, temporizador y orquestación del Quiz de Banderas.
 * @spec REQ-02, REQ-03, REQ-04, REQ-05
 */

import { COUNTRIES, COUNTRIES_BY_CODE } from '../data/countries.data';
import { validateCountryAnswer } from './validation';
import { getLanguage } from '../common/i18n';

export type QuizStatus = 'idle' | 'running' | 'completed' | 'abandoned';

export interface QuizState {
  status: QuizStatus;
  elapsedSeconds: number;
  guessedCodes: Set<string>;
  guessedDetails: Map<string, { matchedName: string; isShortcut: boolean }>;
  revealedRemaining: boolean;
}

export type QuizStateListener = (state: QuizState) => void;

class QuizEngine {
  private status: QuizStatus = 'idle';
  private elapsedSeconds = 0;
  private timerInterval: any = null;
  private guessedCodes = new Set<string>();
  private guessedDetails = new Map<string, { matchedName: string; isShortcut: boolean }>();
  private revealedRemaining = false;
  private listeners = new Set<QuizStateListener>();

  public getSnapshot(): QuizState {
    return {
      status: this.status,
      elapsedSeconds: this.elapsedSeconds,
      guessedCodes: new Set(this.guessedCodes),
      guessedDetails: new Map(this.guessedDetails),
      revealedRemaining: this.revealedRemaining
    };
  }

  public subscribe(listener: QuizStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getSnapshot());
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    const snapshot = this.getSnapshot();
    this.listeners.forEach(fn => fn(snapshot));
  }

  public start(): void {
    if (this.status === 'running') return;

    this.status = 'running';
    this.elapsedSeconds = 0;
    this.guessedCodes.clear();
    this.guessedDetails.clear();
    this.revealedRemaining = false;

    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds += 1;
      this.notify();
    }, 1000);

    this.notify();
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public submitAnswerForCountry(code: string, rawInput: string): boolean {
    if (this.status !== 'running') {
      // Si el usuario escribe y pulsa Enter antes de pulsar "Start Quiz", iniciamos el quiz automáticamente
      this.start();
    }

    if (this.guessedCodes.has(code)) {
      return true; // Ya acertado
    }

    const country = COUNTRIES_BY_CODE.get(code);
    if (!country) return false;

    const currentLang = getLanguage();
    const result = validateCountryAnswer(country, rawInput, currentLang);

    if (result.matched) {
      this.guessedCodes.add(code);
      this.guessedDetails.set(code, {
        matchedName: result.matchedName || (currentLang === 'es' ? country.nameEs : country.nameEn),
        isShortcut: Boolean(result.isCompoundShortcut)
      });

      // Si ha completado las 196 banderas
      if (this.guessedCodes.size === COUNTRIES.length) {
        this.status = 'completed';
        this.stopTimer();
      }

      this.notify();
      return true;
    }

    return false;
  }

  public giveUp(): void {
    if (this.status !== 'running') return;
    this.status = 'abandoned';
    this.revealedRemaining = true;
    this.stopTimer();
    this.notify();
  }

  public restart(): void {
    this.stopTimer();
    this.status = 'idle';
    this.elapsedSeconds = 0;
    this.guessedCodes.clear();
    this.guessedDetails.clear();
    this.revealedRemaining = false;
    this.notify();
  }

  public getGuestBestTime(): number | null {
    if (typeof localStorage === 'undefined') return null;
    const val = localStorage.getItem('guacamolegh_flags_guest_best_time');
    return val ? parseInt(val, 10) : null;
  }

  public setGuestBestTime(seconds: number): void {
    if (typeof localStorage === 'undefined') return;
    const current = this.getGuestBestTime();
    if (!current || seconds < current) {
      localStorage.setItem('guacamolegh_flags_guest_best_time', seconds.toString());
    }
  }

  public formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(minutes)}:${pad(seconds)}`;
  }
}

export const quizEngine = new QuizEngine();
