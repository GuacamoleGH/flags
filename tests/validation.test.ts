// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

import { describe, it, expect } from 'vitest';
import { COUNTRIES, COUNTRIES_BY_CODE } from '../src/data/countries.data';
import { normalizeText, validateCountryAnswer } from '../src/quiz/validation';

describe('Country Dataset & Flag Association', () => {
  it('contains exactly 196 countries', () => {
    expect(COUNTRIES.length).toBe(196);
  });

  it('all 196 countries have unique 2-letter codes and valid fields', () => {
    const codes = new Set<string>();
    for (const c of COUNTRIES) {
      expect(c.code).toMatch(/^[a-z]{2}$/);
      expect(codes.has(c.code)).toBe(false);
      codes.add(c.code);
      expect(c.nameEs).toBeTruthy();
      expect(c.nameEn).toBeTruthy();
      expect(c.capitalEs).toBeTruthy();
      expect(c.capitalEn).toBeTruthy();
      expect(c.continentEs).toBeTruthy();
      expect(c.continentEn).toBeTruthy();
      expect(c.flagUrl).toBe(`/flags/${c.code}.svg`);
    }
  });
});

describe('Smart Answer Validation Engine (Bilingual ES & EN)', () => {
  const spain = COUNTRIES_BY_CODE.get('es')!;
  const saoTome = COUNTRIES_BY_CODE.get('st')!;
  const northMacedonia = COUNTRIES_BY_CODE.get('mk')!;
  const usa = COUNTRIES_BY_CODE.get('us')!;
  const netherlands = COUNTRIES_BY_CODE.get('nl')!;
  const germany = COUNTRIES_BY_CODE.get('de')!;

  it('normalizes diacritics, case, and whitespace', () => {
    expect(normalizeText('  España  ')).toBe('espana');
    expect(normalizeText('SÃO TOMÉ   and PRÍNCIPE')).toBe('sao tome and principe');
    expect(normalizeText('U.S.A.')).toBe('u s a');
  });

  it('accepts exact name in Spanish and English regardless of active language', () => {
    // En modo Español: acepta español e inglés
    expect(validateCountryAnswer(spain, 'España', 'es').matched).toBe(true);
    expect(validateCountryAnswer(spain, 'espana', 'es').matched).toBe(true);
    expect(validateCountryAnswer(spain, 'Spain', 'es').matched).toBe(true);
    expect(validateCountryAnswer(spain, 'spain', 'es').matched).toBe(true);
    expect(validateCountryAnswer(germany, 'Alemania', 'es').matched).toBe(true);
    expect(validateCountryAnswer(germany, 'Germany', 'es').matched).toBe(true);

    // En modo Inglés: acepta español e inglés
    expect(validateCountryAnswer(spain, 'Spain', 'en').matched).toBe(true);
    expect(validateCountryAnswer(spain, 'spain', 'en').matched).toBe(true);
    expect(validateCountryAnswer(spain, 'España', 'en').matched).toBe(true);
    expect(validateCountryAnswer(spain, 'espana', 'en').matched).toBe(true);
    expect(validateCountryAnswer(germany, 'Germany', 'en').matched).toBe(true);
    expect(validateCountryAnswer(germany, 'Alemania', 'en').matched).toBe(true);
  });

  it('REJECTS aggressive autocomplete/prefixes on simple country names', () => {
    expect(validateCountryAnswer(spain, 'esp', 'es').matched).toBe(false);
    expect(validateCountryAnswer(spain, 'Esp', 'es').matched).toBe(false);
    expect(validateCountryAnswer(spain, 'spa', 'en').matched).toBe(false);
    expect(validateCountryAnswer(germany, 'ger', 'es').matched).toBe(false);
  });

  it('recognizes compound country smart shortcuts: Sao Tome -> São Tomé and Príncipe', () => {
    const resultEs = validateCountryAnswer(saoTome, 'Sao Tome', 'es');
    expect(resultEs.matched).toBe(true);
    expect(resultEs.isCompoundShortcut).toBe(true);

    const resultEn = validateCountryAnswer(saoTome, 'sao tome', 'en');
    expect(resultEn.matched).toBe(true);
    expect(resultEn.isCompoundShortcut).toBe(true);
  });

  it('recognizes compound country smart shortcuts: Macedonia -> North Macedonia', () => {
    const resultEs = validateCountryAnswer(northMacedonia, 'Macedonia', 'es');
    expect(resultEs.matched).toBe(true);
    expect(resultEs.isCompoundShortcut).toBe(true);

    const resultEn = validateCountryAnswer(northMacedonia, 'Macedonia', 'en');
    expect(resultEn.matched).toBe(true);
    expect(resultEn.isCompoundShortcut).toBe(true);
  });

  it('accepts acronyms and compound shortcuts in both languages', () => {
    // USA / EEUU en ambos idiomas
    expect(validateCountryAnswer(usa, 'USA', 'en').matched).toBe(true);
    expect(validateCountryAnswer(usa, 'USA', 'es').matched).toBe(true);
    expect(validateCountryAnswer(usa, 'EEUU', 'es').matched).toBe(true);
    expect(validateCountryAnswer(usa, 'EEUU', 'en').matched).toBe(true);
    expect(validateCountryAnswer(usa, 'United States', 'es').matched).toBe(true);
    expect(validateCountryAnswer(usa, 'Estados Unidos', 'en').matched).toBe(true);

    // Holanda / Holland / Países Bajos / Netherlands
    expect(validateCountryAnswer(netherlands, 'Holanda', 'es').matched).toBe(true);
    expect(validateCountryAnswer(netherlands, 'Holland', 'es').matched).toBe(true);
    expect(validateCountryAnswer(netherlands, 'Holland', 'en').matched).toBe(true);
    expect(validateCountryAnswer(netherlands, 'Holanda', 'en').matched).toBe(true);
    expect(validateCountryAnswer(netherlands, 'Paises Bajos', 'en').matched).toBe(true);
    expect(validateCountryAnswer(netherlands, 'Netherlands', 'es').matched).toBe(true);
  });
});
