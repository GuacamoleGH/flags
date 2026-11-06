// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Motor de normalización y validación precisa de respuestas y alias bilingües.
 * Permite responder en español o en inglés de manera fluida en cualquier modo.
 * @spec REQ-03, REQ-04, REQ-06
 */

import type { Country, SupportedLanguage, AnswerValidationResult } from '../common/types/country';

/**
 * Mapeo de atajos para países compuestos en español e inglés.
 */
const COMPOUND_SHORT_BY_LANG: Record<string, { es: readonly string[]; en: readonly string[] }> = {
  ag: { es: ['antigua'], en: ['antigua'] },
  sa: { es: ['arabia saudita', 'arabia saudi'], en: ['saudi arabia'] },
  ba: { es: ['bosnia'], en: ['bosnia'] },
  cv: { es: ['cabo verde'], en: ['cape verde'] },
  va: { es: ['vaticano', 'santa sede'], en: ['vatican', 'holy see'] },
  kp: { es: ['corea del norte'], en: ['north korea'] },
  kr: { es: ['corea del sur'], en: ['south korea'] },
  ci: { es: ['costa de marfil'], en: ['ivory coast', 'cote d ivoire'] },
  cr: { es: ['costa rica'], en: ['costa rica'] },
  sv: { es: ['el salvador', 'salvador'], en: ['el salvador', 'salvador'] },
  ae: { es: ['eau', 'emiratos'], en: ['uae', 'emirates'] },
  us: { es: ['eeuu', 'estados unidos'], en: ['usa', 'united states', 'america'] },
  gq: { es: ['guinea ecuatorial'], en: ['equatorial guinea'] },
  gw: { es: ['guinea bisau', 'guinea bissau'], en: ['guinea bissau'] },
  mh: { es: ['marshall'], en: ['marshall'] },
  sb: { es: ['salomon'], en: ['solomon'] },
  mk: { es: ['macedonia'], en: ['macedonia'] },
  fm: { es: ['micronesia'], en: ['micronesia'] },
  nz: { es: ['nueva zelanda'], en: ['new zealand'] },
  nl: { es: ['holanda', 'paises bajos'], en: ['holland', 'netherlands'] },
  pg: { es: ['papua', 'png'], en: ['papua', 'png'] },
  gb: { es: ['reino unido', 'gran bretana'], en: ['uk', 'great britain'] },
  cf: { es: ['rca', 'centroafrica', 'rep centroafricana'], en: ['car', 'central africa'] },
  cz: { es: ['chequia', 'republica checa'], en: ['czechia', 'czech republic'] },
  cg: { es: ['congo brazzaville', 'republica del congo'], en: ['republic of the congo'] },
  cd: { es: ['rdc', 'rd congo', 'congo kinshasa'], en: ['drc', 'dr congo'] },
  do: { es: ['dominicana', 'rep dominicana'], en: ['dominican rep'] },
  kn: { es: ['san cristobal'], en: ['st kitts', 'saint kitts'] },
  sm: { es: ['san marino'], en: ['san marino'] },
  vc: { es: ['san vicente'], en: ['st vincent', 'saint vincent'] },
  lc: { es: ['santa lucia'], en: ['st lucia'] },
  st: { es: ['santo tome', 'sao tome'], en: ['sao tome'] },
  sl: { es: ['sierra leona'], en: ['sierra leone'] },
  ss: { es: ['sudan del sur'], en: ['south sudan'] },
  tl: { es: ['timor'], en: ['timor'] },
  tt: { es: ['trinidad'], en: ['trinidad'] },
};

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
 * Obtiene todos los atajos reconocidos para un país compuesto (en español, inglés y configurados).
 */
function getCompoundShortcuts(country: Country): string[] {
  if (!country.isCompound) return [];
  const langShortcuts = COMPOUND_SHORT_BY_LANG[country.code];
  const combined = [
    ...(country.compoundShort ?? []),
    ...(langShortcuts?.es ?? []),
    ...(langShortcuts?.en ?? [])
  ];
  return Array.from(new Set(combined));
}

/**
 * Comprueba si la respuesta escrita por el usuario coincide con un país dado.
 *
 * Reglas:
 * 1. Coincidencia exacta con el nombre oficial tanto en español como en inglés.
 * 2. Coincidencia exacta con cualquiera de los alias configurados en español o en inglés.
 * 3. En países compuestos, coincidencia con las abreviaciones inequívocas en español o en inglés.
 * 4. NUNCA se aceptan prefijos parciales arbitrarios para países simples.
 *
 * @param country Objeto del país
 * @param rawInput Texto escrito por el usuario
 * @param lang Idioma preferente de la interfaz ('es' | 'en') para determinar el nombre devuelto
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

  // 1. Obtener atajos válidos para países compuestos (combinando ES y EN)
  const allShortcuts = getCompoundShortcuts(country);
  const isCompoundShortcut = allShortcuts.some(
    shortForm => normalizeText(shortForm) === normalizedInput
  );

  // 2. Validar nombres oficiales (español e inglés)
  if (normalizeText(country.nameEs) === normalizedInput) {
    return { matched: true, matchedName: country.nameEs, isCompoundShortcut };
  }
  if (normalizeText(country.nameEn) === normalizedInput) {
    return { matched: true, matchedName: country.nameEn, isCompoundShortcut };
  }

  // 3. Validar alias oficiales configurados en ambos idiomas
  const allAliases = [...(country.aliasesEs || []), ...(country.aliasesEn || [])];
  for (const alias of allAliases) {
    if (normalizeText(alias) === normalizedInput) {
      return { matched: true, matchedName: alias, isCompoundShortcut };
    }
  }

  // 4. Validar atajo explícito compuesto
  if (isCompoundShortcut) {
    const defaultDisplayName = lang === 'en' ? country.nameEn : country.nameEs;
    return {
      matched: true,
      matchedName: defaultDisplayName,
      isCompoundShortcut: true
    };
  }

  return { matched: false };
}

/**
 * Busca sugerencias visuales entre los países aún no acertados.
 * Requiere un mínimo de 3 caracteres y busca tanto en español como en inglés.
 */
export function getCountrySuggestions(
  rawInput: string,
  unansweredCountries: readonly Country[],
  _lang: SupportedLanguage = 'es',
  maxResults = 5
): Country[] {
  const normalizedInput = normalizeText(rawInput);
  if (!normalizedInput || normalizedInput.length < 3) {
    return [];
  }

  const results: Country[] = [];
  for (const country of unansweredCountries) {
    const matchName =
      normalizeText(country.nameEs).startsWith(normalizedInput) ||
      normalizeText(country.nameEn).startsWith(normalizedInput);

    if (matchName) {
      results.push(country);
      if (results.length >= maxResults) break;
      continue;
    }

    const allAliases = [...(country.aliasesEs || []), ...(country.aliasesEn || [])];
    const matchAlias = allAliases.some(alias => normalizeText(alias).startsWith(normalizedInput));
    if (matchAlias) {
      results.push(country);
      if (results.length >= maxResults) break;
      continue;
    }

    // Comprobar atajos de compuestos bilingües
    if (country.isCompound) {
      const allShortcuts = getCompoundShortcuts(country);
      const matchShort = allShortcuts.some(s => normalizeText(s).startsWith(normalizedInput));
      if (matchShort) {
        results.push(country);
        if (results.length >= maxResults) break;
      }
    }
  }

  return results;
}
