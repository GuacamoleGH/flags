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
 * Mapeo estricto de atajos para países compuestos según el idioma activo.
 * Evita que atajos o nombres en inglés sean aceptados cuando el juego está en español y viceversa.
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
 * Comprueba si la respuesta escrita por el usuario coincide con un país dado.
 *
 * Reglas estrictas:
 * 1. Coincidencia exacta con el nombre oficial en el idioma activo exclusivamente.
 * 2. Coincidencia exacta con cualquiera de los alias explícitos configurados para el idioma activo.
 * 3. En países compuestos, coincidencia con las abreviaciones inequívocas del idioma activo.
 * 4. NUNCA se aceptan respuestas en otro idioma ni prefijos parciales arbitrarios.
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

  // 1. Obtener atajos válidos para países compuestos en el idioma activo
  const langShortcuts = COMPOUND_SHORT_BY_LANG[country.code]?.[lang];
  const activeShortcuts = country.isCompound
    ? (langShortcuts ?? country.compoundShort)
    : [];

  const isCompoundShortcut = activeShortcuts.some(
    shortForm => normalizeText(shortForm) === normalizedInput
  );

  // 2. Validar nombre principal en el idioma seleccionado
  const primaryName = lang === 'es' ? country.nameEs : country.nameEn;
  if (normalizeText(primaryName) === normalizedInput) {
    return { matched: true, matchedName: primaryName, isCompoundShortcut };
  }

  // 3. Validar alias oficiales configurados para el idioma activo
  const activeAliases = lang === 'es' ? country.aliasesEs : country.aliasesEn;
  for (const alias of activeAliases) {
    if (normalizeText(alias) === normalizedInput) {
      return { matched: true, matchedName: alias, isCompoundShortcut };
    }
  }

  // 4. Validar atajo explícito según idioma activo
  if (isCompoundShortcut) {
    return {
      matched: true,
      matchedName: primaryName,
      isCompoundShortcut: true
    };
  }

  return { matched: false };
}

/**
 * Busca sugerencias visuales entre los países aún no acertados.
 * Requiere un mínimo de 3 caracteres y busca únicamente en el idioma activo.
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
    if (primaryName.startsWith(normalizedInput)) {
      results.push(country);
      if (results.length >= maxResults) break;
      continue;
    }

    const activeAliases = lang === 'es' ? country.aliasesEs : country.aliasesEn;
    const matchAlias = activeAliases.some(alias => normalizeText(alias).startsWith(normalizedInput));
    if (matchAlias) {
      results.push(country);
      if (results.length >= maxResults) break;
      continue;
    }

    // Comprobar atajos de compuestos según idioma activo
    if (country.isCompound) {
      const activeShortcuts = COMPOUND_SHORT_BY_LANG[country.code]?.[lang] ?? [];
      const matchShort = activeShortcuts.some(s => normalizeText(s).startsWith(normalizedInput));
      if (matchShort) {
        results.push(country);
        if (results.length >= maxResults) break;
      }
    }
  }

  return results;
}
