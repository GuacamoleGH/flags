// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Motor de estado, temporizador, modos de juego (Mundo o Continentes) y navegación.
 * @spec REQ-02, REQ-03, REQ-04, REQ-05
 */

import { COUNTRIES, COUNTRIES_BY_CODE } from '../data/countries.data';
import type { Country } from '../common/types/country';
import { validateCountryAnswer } from './validation';
import { getLanguage } from '../common/i18n';

export type QuizStatus = 'idle' | 'running' | 'completed' | 'abandoned';
export type QuizGameMode = 'world' | 'europe' | 'asia' | 'africa' | 'americas' | 'oceania';

export interface QuizState {
  status: QuizStatus;
  gameMode: QuizGameMode;
  elapsedSeconds: number;
  guessedCodes: Set<string>;
  guessedDetails: Map<string, { matchedName: string; isShortcut: boolean }>;
  revealedRemaining: boolean;
  shuffledCodes: string[];
  activeCode: string;
  totalInMode: number;
}

export type QuizStateListener = (state: QuizState) => void;

function shuffleArray<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = temp;
  }
  return arr;
}

function getCountriesForMode(mode: QuizGameMode): readonly Country[] {
  if (mode === 'world') return COUNTRIES;

  return COUNTRIES.filter(c => {
    const cont = c.continentEs;
    if (mode === 'europe') return cont.includes('Europa') || c.code === 'cy' || c.code === 'tr' || c.code === 'ru';
    if (mode === 'asia') return cont.includes('Asia');
    if (mode === 'africa') return cont.includes('África');
    if (mode === 'americas') return cont.includes('América');
    if (mode === 'oceania') return cont.includes('Oceanía');
    return true;
  });
}

class QuizEngine {
  private status: QuizStatus = 'idle';
  private gameMode: QuizGameMode = 'world';
  private elapsedSeconds = 0;
  private timerInterval: any = null;
  private guessedCodes = new Set<string>();
  private guessedDetails = new Map<string, { matchedName: string; isShortcut: boolean }>();
  private revealedRemaining = false;
  private shuffledCodes: string[] = [];
  private activeCode: string = '';
  private listeners = new Set<QuizStateListener>();

  constructor() {
    this.initRandomOrder();
  }

  private initRandomOrder(): void {
    const countries = getCountriesForMode(this.gameMode);
    const allCodes = countries.map(c => c.code);
    this.shuffledCodes = shuffleArray(allCodes);
    this.activeCode = this.shuffledCodes[0] || 'es';
  }

  public getSnapshot(): QuizState {
    return {
      status: this.status,
      gameMode: this.gameMode,
      elapsedSeconds: this.elapsedSeconds,
      guessedCodes: new Set(this.guessedCodes),
      guessedDetails: new Map(this.guessedDetails),
      revealedRemaining: this.revealedRemaining,
      shuffledCodes: [...this.shuffledCodes],
      activeCode: this.activeCode,
      totalInMode: this.shuffledCodes.length
    };
  }

  public getActiveCountry(): Country {
    return COUNTRIES_BY_CODE.get(this.activeCode) || COUNTRIES[0]!;
  }

  public setGameMode(mode: QuizGameMode): void {
    if (this.gameMode === mode) return;
    this.gameMode = mode;
    this.restart();
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
    this.initRandomOrder();

    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds += 1;
      this.notify();
    }, 1000);

    this.notify();
  }

  public ensureRunningOnTyping(): void {
    if (this.status === 'idle') {
      this.status = 'running';
      this.stopTimer();
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds += 1;
        this.notify();
      }, 1000);
      this.notify();
    }
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public setActiveCode(code: string): void {
    if (COUNTRIES_BY_CODE.has(code)) {
      this.activeCode = code;
      this.notify();
    }
  }

  public nextFlag(): void {
    if (this.shuffledCodes.length === 0) return;
    const currentIndex = this.shuffledCodes.indexOf(this.activeCode);

    for (let offset = 1; offset < this.shuffledCodes.length; offset++) {
      const idx = (currentIndex + offset) % this.shuffledCodes.length;
      const code = this.shuffledCodes[idx]!;
      if (!this.guessedCodes.has(code)) {
        this.activeCode = code;
        this.notify();
        return;
      }
    }

    const nextIdx = (currentIndex + 1) % this.shuffledCodes.length;
    this.activeCode = this.shuffledCodes[nextIdx] || this.activeCode;
    this.notify();
  }

  public prevFlag(): void {
    if (this.shuffledCodes.length === 0) return;
    const currentIndex = this.shuffledCodes.indexOf(this.activeCode);

    for (let offset = 1; offset < this.shuffledCodes.length; offset++) {
      let idx = (currentIndex - offset) % this.shuffledCodes.length;
      if (idx < 0) idx += this.shuffledCodes.length;
      const code = this.shuffledCodes[idx]!;
      if (!this.guessedCodes.has(code)) {
        this.activeCode = code;
        this.notify();
        return;
      }
    }

    let prevIdx = (currentIndex - 1) % this.shuffledCodes.length;
    if (prevIdx < 0) prevIdx += this.shuffledCodes.length;
    this.activeCode = this.shuffledCodes[prevIdx] || this.activeCode;
    this.notify();
  }

  public submitActiveAnswer(rawInput: string): boolean {
    this.ensureRunningOnTyping();

    const currentCountry = this.getActiveCountry();
    if (this.guessedCodes.has(currentCountry.code)) {
      this.nextFlag();
      return true;
    }

    const currentLang = getLanguage();
    const result = validateCountryAnswer(currentCountry, rawInput, currentLang);

    if (result.matched) {
      this.guessedCodes.add(currentCountry.code);
      this.guessedDetails.set(currentCountry.code, {
        matchedName: result.matchedName || (currentLang === 'es' ? currentCountry.nameEs : currentCountry.nameEn),
        isShortcut: Boolean(result.isCompoundShortcut)
      });

      if (this.guessedCodes.size === this.shuffledCodes.length) {
        this.status = 'completed';
        this.stopTimer();
        this.notify();
        return true;
      }

      this.nextFlag();
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
    this.initRandomOrder();
    this.notify();
  }

  public getGuestBestTime(mode: QuizGameMode): number | null {
    if (typeof localStorage === 'undefined') return null;
    const val = localStorage.getItem(`guacamolegh_flags_guest_best_time_${mode}`);
    return val ? parseInt(val, 10) : null;
  }

  public setGuestBestTime(mode: QuizGameMode, seconds: number): void {
    if (typeof localStorage === 'undefined') return;
    const current = this.getGuestBestTime(mode);
    if (!current || seconds < current) {
      localStorage.setItem(`guacamolegh_flags_guest_best_time_${mode}`, seconds.toString());
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
