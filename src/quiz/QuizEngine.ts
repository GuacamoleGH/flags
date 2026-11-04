// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Motor de estado, temporizador, orden aleatorio y navegación de bandera activa.
 * @spec REQ-02, REQ-03, REQ-04, REQ-05
 */

import { COUNTRIES, COUNTRIES_BY_CODE } from '../data/countries.data';
import type { Country } from '../common/types/country';
import { validateCountryAnswer } from './validation';
import { getLanguage } from '../common/i18n';

export type QuizStatus = 'idle' | 'running' | 'completed' | 'abandoned';

export interface QuizState {
  status: QuizStatus;
  elapsedSeconds: number;
  guessedCodes: Set<string>;
  guessedDetails: Map<string, { matchedName: string; isShortcut: boolean }>;
  revealedRemaining: boolean;
  shuffledCodes: string[];
  activeCode: string;
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

class QuizEngine {
  private status: QuizStatus = 'idle';
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
    const allCodes = COUNTRIES.map(c => c.code);
    this.shuffledCodes = shuffleArray(allCodes);
    this.activeCode = this.shuffledCodes[0] || 'es';
  }

  public getSnapshot(): QuizState {
    return {
      status: this.status,
      elapsedSeconds: this.elapsedSeconds,
      guessedCodes: new Set(this.guessedCodes),
      guessedDetails: new Map(this.guessedDetails),
      revealedRemaining: this.revealedRemaining,
      shuffledCodes: [...this.shuffledCodes],
      activeCode: this.activeCode
    };
  }

  public getActiveCountry(): Country {
    return COUNTRIES_BY_CODE.get(this.activeCode) || COUNTRIES[0]!;
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
    
    // Buscar la siguiente bandera pendiente empezando desde currentIndex + 1
    for (let offset = 1; offset < this.shuffledCodes.length; offset++) {
      const idx = (currentIndex + offset) % this.shuffledCodes.length;
      const code = this.shuffledCodes[idx]!;
      if (!this.guessedCodes.has(code)) {
        this.activeCode = code;
        this.notify();
        return;
      }
    }

    // Si todas están acertadas o no quedan pendientes en bucle, avanzar cíclicamente
    const nextIdx = (currentIndex + 1) % this.shuffledCodes.length;
    this.activeCode = this.shuffledCodes[nextIdx] || this.activeCode;
    this.notify();
  }

  public prevFlag(): void {
    if (this.shuffledCodes.length === 0) return;
    const currentIndex = this.shuffledCodes.indexOf(this.activeCode);

    // Buscar la bandera pendiente anterior
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

  /**
   * Intenta validar la respuesta para la bandera activa actual.
   * Si es correcta:
   * - Marca la bandera como acertada.
   * - Salta automáticamente a la siguiente bandera pendiente.
   * - Devuelve true.
   */
  public submitActiveAnswer(rawInput: string): boolean {
    if (this.status !== 'running') {
      this.start();
    }

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

      // Si ha completado las 196 banderas
      if (this.guessedCodes.size === COUNTRIES.length) {
        this.status = 'completed';
        this.stopTimer();
        this.notify();
        return true;
      }

      // Avanzar automáticamente a la siguiente bandera no acertada
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
