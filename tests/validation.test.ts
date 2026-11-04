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

describe('Smart Answer Validation Engine', () => {
  const spain = COUNTRIES_BY_CODE.get('es')!;
  const saoTome = COUNTRIES_BY_CODE.get('st')!;
  const northMacedonia = COUNTRIES_BY_CODE.get('mk')!;
  const usa = COUNTRIES_BY_CODE.get('us')!;
  const netherlands = COUNTRIES_BY_CODE.get('nl')!;

  it('normalizes diacritics, case, and whitespace', () => {
    expect(normalizeText('  España  ')).toBe('espana');
    expect(normalizeText('SÃO TOMÉ   and PRÍNCIPE')).toBe('sao tome and principe');
    expect(normalizeText('U.S.A.')).toBe('u s a');
  });

  it('accepts exact name in Spanish with or without accents', () => {
    expect(validateCountryAnswer(spain, 'España', 'es').matched).toBe(true);
    expect(validateCountryAnswer(spain, 'espana', 'es').matched).toBe(true);
    expect(validateCountryAnswer(spain, 'ESPAÑA', 'es').matched).toBe(true);
  });

  it('accepts exact name in English', () => {
    expect(validateCountryAnswer(spain, 'Spain', 'en').matched).toBe(true);
    expect(validateCountryAnswer(spain, 'spain', 'es').matched).toBe(true);
  });

  it('REJECTS aggressive autocomplete/prefixes on simple country names', () => {
    expect(validateCountryAnswer(spain, 'esp', 'es').matched).toBe(false);
    expect(validateCountryAnswer(spain, 'Esp', 'es').matched).toBe(false);
    expect(validateCountryAnswer(spain, 'spa', 'en').matched).toBe(false);
  });

  it('recognizes compound country smart shortcuts: Sao Tome -> São Tomé and Príncipe', () => {
    const resultEs = validateCountryAnswer(saoTome, 'Sao Tome', 'es');
    expect(resultEs.matched).toBe(true);
    expect(resultEs.isCompoundShortcut).toBe(true);

    const resultEn = validateCountryAnswer(saoTome, 'sao tome', 'en');
    expect(resultEn.matched).toBe(true);
  });

  it('recognizes compound country smart shortcuts: Macedonia -> North Macedonia', () => {
    const result = validateCountryAnswer(northMacedonia, 'Macedonia', 'es');
    expect(result.matched).toBe(true);
    expect(result.isCompoundShortcut).toBe(true);
  });

  it('recognizes common acronyms: USA, EEUU, Holanda', () => {
    expect(validateCountryAnswer(usa, 'USA', 'en').matched).toBe(true);
    expect(validateCountryAnswer(usa, 'EEUU', 'es').matched).toBe(true);
    expect(validateCountryAnswer(netherlands, 'Holanda', 'es').matched).toBe(true);
    expect(validateCountryAnswer(netherlands, 'Holland', 'en').matched).toBe(true);
  });
});
