// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Motor de normalización y validación precisa de respuestas y alias.
 * @spec REQ-03, REQ-04
 */

import type { Country, SupportedLanguage, AnswerValidationResult } from '../common/types/country';

/**
 * Normaliza una cadena de texto para comparación flexible:
 * - Conversión a minúsculas.
 * - Eliminación de diacríticos y tildes (á->a, é->e, etc.).
 * - 'ñ' se normaliza a 'n' para permitir que usuarios sin teclado español puedan responder.
 * - Eliminación de signos de puntuación (puntos, comas, guiones, apóstrofes, paréntesis).
 * - Colapso de espacios en blanco múltiples a uno solo.
 * - Recorte de espacios iniciales y finales.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos/diacríticos
    .replace(/ñ/g, 'n')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()'"?]/g, ' ') // Puntuación a espacios
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Comprueba si la respuesta escrita por el usuario coincide con un país dado.
 *
 * Reglas estrictas:
 * 1. Coincidencia exacta con el nombre oficial en el idioma activo (o en el otro idioma como cortesía).
 * 2. Coincidencia exacta con cualquiera de los alias explícitos configurados.
 * 3. En países compuestos, coincidencia con las abreviaciones inequívocas (`compoundShort`).
 * 4. NUNCA se aceptan prefijos parciales arbitrarios (ej. 'esp' NO valida España).
 *
 * @param country Objeto del país
 * @param rawInput Texto escrito por el usuario
 * @param lang Idioma actual de la interfaz ('es' | 'en')
 */
export function validateCountryAnswer(
  country: Country,
  rawInput: string,
  lang: SupportedLanguage = 'es'
): AnswerValidationResult {
  const normalizedInput = normalizeText(rawInput);
  if (!normalizedInput || normalizedInput.length < 2) {
    return { matched: false };
  }

  // Comprobar si coincide con un atajo configurado para países compuestos (ej: 'sao tome', 'macedonia')
  const isCompoundShortcut = country.isCompound && country.compoundShort.some(
    shortForm => normalizeText(shortForm) === normalizedInput
  );

  // 1. Validar nombre principal en el idioma seleccionado
  const primaryName = lang === 'es' ? country.nameEs : country.nameEn;
  if (normalizeText(primaryName) === normalizedInput) {
    return { matched: true, matchedName: primaryName, isCompoundShortcut };
  }

  // 2. Validar nombre principal en el idioma secundario
  const secondaryName = lang === 'es' ? country.nameEn : country.nameEs;
  if (normalizeText(secondaryName) === normalizedInput) {
    return { matched: true, matchedName: secondaryName, isCompoundShortcut };
  }

  // 3. Validar alias oficiales configurados para el idioma activo
  const activeAliases = lang === 'es' ? country.aliasesEs : country.aliasesEn;
  for (const alias of activeAliases) {
    if (normalizeText(alias) === normalizedInput) {
      return { matched: true, matchedName: alias, isCompoundShortcut };
    }
  }

  // 4. Validar alias del idioma secundario
  const secondaryAliases = lang === 'es' ? country.aliasesEn : country.aliasesEs;
  for (const alias of secondaryAliases) {
    if (normalizeText(alias) === normalizedInput) {
      return { matched: true, matchedName: alias, isCompoundShortcut };
    }
  }

  // 5. Validar atajo explícito si no estaba en alias
  if (isCompoundShortcut) {
    return {
      matched: true,
      matchedName: lang === 'es' ? country.nameEs : country.nameEn,
      isCompoundShortcut: true
    };
  }

  return { matched: false };
}

/**
 * Busca sugerencias visuales entre los países aún no acertados.
 * Requiere un mínimo de 3 caracteres y NO valida la respuesta hasta confirmación expresa.
 */
export function getCountrySuggestions(
  rawInput: string,
  unansweredCountries: readonly Country[],
  lang: SupportedLanguage = 'es',
  maxResults = 5
): Country[] {
  const normalizedInput = normalizeText(rawInput);
  if (!normalizedInput || normalizedInput.length < 3) {
    return [];
  }

  const results: Country[] = [];
  for (const country of unansweredCountries) {
    const primaryName = normalizeText(lang === 'es' ? country.nameEs : country.nameEn);
    const secondaryName = normalizeText(lang === 'es' ? country.nameEn : country.nameEs);

    if (primaryName.startsWith(normalizedInput) || secondaryName.startsWith(normalizedInput)) {
      results.push(country);
      if (results.length >= maxResults) break;
      continue;
    }

    // Comprobar atajos de compuestos
    if (country.isCompound) {
      const matchShort = country.compoundShort.some(s => normalizeText(s).startsWith(normalizedInput));
      if (matchShort) {
        results.push(country);
        if (results.length >= maxResults) break;
      }
    }
  }

  return results;
}
