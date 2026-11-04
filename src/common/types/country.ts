// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

export interface Country {
  /** Código ISO-3166-1 alfa-2 en minúsculas (ej: 'es', 'fr', 'us') */
  readonly code: string;
  /** Nombre oficial en español */
  readonly nameEs: string;
  /** Nombre oficial en inglés */
  readonly nameEn: string;
  /** Capital en español */
  readonly capitalEs: string;
  /** Capital en inglés */
  readonly capitalEn: string;
  /** Continente en español */
  readonly continentEs: string;
  /** Continente en inglés */
  readonly continentEn: string;
  /** Ruta a la bandera SVG local */
  readonly flagUrl: string;
  /** Alias oficiales y variantes en español */
  readonly aliasesEs: readonly string[];
  /** Alias oficiales y variantes en inglés */
  readonly aliasesEn: readonly string[];
  /** Indica si es un país compuesto (con nombre de varias palabras) */
  readonly isCompound: boolean;
  /** Abreviaciones inequívocas aceptadas para países compuestos */
  readonly compoundShort: readonly string[];
}

export type SupportedLanguage = 'es' | 'en';

export interface AnswerValidationResult {
  readonly matched: boolean;
  readonly matchedName?: string;
  readonly isCompoundShortcut?: boolean;
}
