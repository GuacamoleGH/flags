// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';

const esContent = fs.readFileSync('paises_es.md', 'utf8').trim().split('\n');
const enContent = fs.readFileSync('paises_en.md', 'utf8').trim().split('\n');

const parseLine = (line) => {
  const parts = line.split(',').map(s => s.trim());
  const code = parts[0].toLowerCase();
  const name = parts[1];
  const capital = parts.slice(2, parts.length - 1).join(', ');
  const continent = parts[parts.length - 1];
  return { code, name, capital, continent };
};

const esMap = new Map();
esContent.forEach(l => {
  if (!l.trim()) return;
  const p = parseLine(l);
  esMap.set(p.code, p);
});

const enMap = new Map();
enContent.forEach(l => {
  if (!l.trim()) return;
  const p = parseLine(l);
  enMap.set(p.code, p);
});

// Diccionario de enriquecimiento de alias y atajos para países compuestos
const customOverrides = {
  us: {
    aliasesEs: ["EEUU", "EE.UU.", "Estados Unidos de América", "EUA"],
    aliasesEn: ["USA", "U.S.A.", "United States of America", "US", "America"],
    isCompound: true,
    compoundShort: ["usa", "eeuu", "estados unidos", "united states", "america"]
  },
  gb: {
    aliasesEs: ["Gran Bretaña", "Inglaterra", "UK"],
    aliasesEn: ["UK", "Great Britain", "Britain", "England"],
    isCompound: true,
    compoundShort: ["uk", "reino unido", "gran bretana", "great britain"]
  },
  ae: {
    aliasesEs: ["Emiratos Árabes", "EAU", "Emiratos"],
    aliasesEn: ["UAE", "Emirates"],
    isCompound: true,
    compoundShort: ["eau", "uae", "emiratos", "emirates"]
  },
  st: {
    aliasesEs: ["Sao Tome y Principe", "Santo Tomé", "Sao Tome"],
    aliasesEn: ["Sao Tome", "Saint Thomas and Prince"],
    isCompound: true,
    compoundShort: ["sao tome", "santo tome"]
  },
  mk: {
    aliasesEs: ["Macedonia", "ARYM", "Macedonia del N."],
    aliasesEn: ["Macedonia", "FYROM"],
    isCompound: true,
    compoundShort: ["macedonia"]
  },
  cd: {
    aliasesEs: ["RDC", "RD Congo", "Congo Kinshasa", "Congo Democrático", "Congo RDC"],
    aliasesEn: ["DR Congo", "DRC", "Congo Kinshasa", "Democratic Congo"],
    isCompound: true,
    compoundShort: ["rdc", "drc", "rd congo", "dr congo", "congo kinshasa"]
  },
  cg: {
    aliasesEs: ["Congo Brazzaville", "Congo", "El Congo"],
    aliasesEn: ["Congo Brazzaville", "Congo Republic", "Congo"],
    isCompound: true,
    compoundShort: ["congo brazzaville", "republica del congo", "republic of the congo"]
  },
  do: {
    aliasesEs: ["Dominicana", "Rep. Dominicana", "Quisqueya"],
    aliasesEn: ["Dominican Rep", "Dominicana"],
    isCompound: true,
    compoundShort: ["dominicana", "rep dominicana", "dominican rep"]
  },
  cf: {
    aliasesEs: ["Centroáfrica", "RCA", "Rep. Centroafricana"],
    aliasesEn: ["CAR", "Central Africa", "Central African Rep"],
    isCompound: true,
    compoundShort: ["rca", "car", "centroafrica", "central africa", "rep centroafricana"]
  },
  cz: {
    aliasesEs: ["República Checa", "Rep. Checa"],
    aliasesEn: ["Czechia", "Czech Rep"],
    isCompound: true,
    compoundShort: ["chequia", "czechia", "republica checa", "czech republic"]
  },
  ba: {
    aliasesEs: ["Bosnia", "Bosnia-Herzegovina"],
    aliasesEn: ["Bosnia", "Bosnia-Herzegovina"],
    isCompound: true,
    compoundShort: ["bosnia"]
  },
  ag: {
    aliasesEs: ["Antigua"],
    aliasesEn: ["Antigua"],
    isCompound: true,
    compoundShort: ["antigua"]
  },
  tt: {
    aliasesEs: ["Trinidad"],
    aliasesEn: ["Trinidad"],
    isCompound: true,
    compoundShort: ["trinidad"]
  },
  kn: {
    aliasesEs: ["San Cristóbal", "St Kitts", "Saint Kitts y Nevis"],
    aliasesEn: ["St Kitts", "St. Kitts", "Saint Kitts"],
    isCompound: true,
    compoundShort: ["st kitts", "san cristobal", "saint kitts"]
  },
  vc: {
    aliasesEs: ["San Vicente", "St Vincent", "San Vicente y Granadinas"],
    aliasesEn: ["St Vincent", "St. Vincent", "Saint Vincent"],
    isCompound: true,
    compoundShort: ["st vincent", "san vicente", "saint vincent"]
  },
  lc: {
    aliasesEs: ["St Lucia", "St. Lucía"],
    aliasesEn: ["St Lucia", "St. Lucia"],
    isCompound: true,
    compoundShort: ["santa lucia", "st lucia"]
  },
  va: {
    aliasesEs: ["Vaticano", "Santa Sede"],
    aliasesEn: ["Vatican", "Holy See"],
    isCompound: true,
    compoundShort: ["vaticano", "vatican", "santa sede", "holy see"]
  },
  pg: {
    aliasesEs: ["Papua", "PNG"],
    aliasesEn: ["Papua", "PNG"],
    isCompound: true,
    compoundShort: ["papua", "png"]
  },
  ci: {
    aliasesEs: ["Cote d'Ivoire", "Côte d'Ivoire"],
    aliasesEn: ["Cote d'Ivoire", "Côte d'Ivoire"],
    isCompound: true,
    compoundShort: ["costa de marfil", "ivory coast", "cote d ivoire"]
  },
  nl: {
    aliasesEs: ["Holanda", "Paises Bajos"],
    aliasesEn: ["Holland", "The Netherlands"],
    isCompound: true,
    compoundShort: ["holanda", "holland", "paises bajos", "netherlands"]
  },
  mm: {
    aliasesEs: ["Birmania", "Myanmar"],
    aliasesEn: ["Burma", "Myanmar"],
    isCompound: false,
    compoundShort: []
  },
  sz: {
    aliasesEs: ["Suazilandia", "Esuatini", "Eswatini"],
    aliasesEn: ["Swaziland", "Eswatini"],
    isCompound: false,
    compoundShort: []
  },
  tl: {
    aliasesEs: ["Timor-Leste", "Timor Leste", "Timor"],
    aliasesEn: ["Timor-Leste", "Timor Leste", "Timor"],
    isCompound: true,
    compoundShort: ["timor"]
  },
  fm: {
    aliasesEs: ["Micronesia", "Estados Federados de Micronesia"],
    aliasesEn: ["Micronesia", "FSM"],
    isCompound: true,
    compoundShort: ["micronesia"]
  },
  cv: {
    aliasesEs: ["Cape Verde"],
    aliasesEn: ["Cabo Verde"],
    isCompound: true,
    compoundShort: ["cabo verde", "cape verde"]
  },
  kr: {
    aliasesEs: ["Corea Sur", "República de Corea"],
    aliasesEn: ["Republic of Korea", "Korea South"],
    isCompound: true,
    compoundShort: ["corea del sur", "south korea"]
  },
  kp: {
    aliasesEs: ["Corea Norte", "RPDC"],
    aliasesEn: ["DPRK", "Democratic People's Republic of Korea", "Korea North"],
    isCompound: true,
    compoundShort: ["corea del norte", "north korea"]
  },
  ss: {
    aliasesEs: ["Sudan Sur", "Sudan del Sur"],
    aliasesEn: ["Sudan South"],
    isCompound: true,
    compoundShort: ["sudan del sur", "south sudan"]
  },
  ru: {
    aliasesEs: ["Federación Rusa", "Federacion Rusa"],
    aliasesEn: ["Russian Federation"],
    isCompound: false,
    compoundShort: []
  },
  sy: {
    aliasesEs: ["República Árabe Siria"],
    aliasesEn: ["Syrian Arab Republic"],
    isCompound: false,
    compoundShort: []
  },
  tr: {
    aliasesEs: ["Türkiye", "Turquie"],
    aliasesEn: ["Turkiye", "Republic of Turkey"],
    isCompound: false,
    compoundShort: []
  },
  sa: {
    aliasesEs: ["Arabia Saudí", "Reino de Arabia Saudita"],
    aliasesEn: ["KSA", "Kingdom of Saudi Arabia"],
    isCompound: true,
    compoundShort: ["arabia saudita", "saudi arabia", "arabia saudi"]
  },
  nz: {
    aliasesEs: ["Nueva Zelandia", "Aotearoa"],
    aliasesEn: ["Aotearoa"],
    isCompound: true,
    compoundShort: ["nueva zelanda", "new zealand"]
  },
  cr: {
    aliasesEs: [],
    aliasesEn: [],
    isCompound: true,
    compoundShort: ["costa rica"]
  },
  sv: {
    aliasesEs: ["Salvador"],
    aliasesEn: ["Salvador"],
    isCompound: true,
    compoundShort: ["el salvador", "salvador"]
  },
  sl: {
    aliasesEs: [],
    aliasesEn: [],
    isCompound: true,
    compoundShort: ["sierra leona", "sierra leone"]
  },
  sm: {
    aliasesEs: [],
    aliasesEn: [],
    isCompound: true,
    compoundShort: ["san marino"]
  },
  gq: {
    aliasesEs: [],
    aliasesEn: [],
    isCompound: true,
    compoundShort: ["guinea ecuatorial", "equatorial guinea"]
  },
  gw: {
    aliasesEs: ["Guinea Bisau", "Guinea-Bissau"],
    aliasesEn: ["Guinea Bissau"],
    isCompound: true,
    compoundShort: ["guinea bisau", "guinea bissau"]
  },
  mh: {
    aliasesEs: ["Marshall"],
    aliasesEn: ["Marshall"],
    isCompound: true,
    compoundShort: ["marshall"]
  },
  sb: {
    aliasesEs: ["Salomon", "Salomón"],
    aliasesEn: ["Solomon"],
    isCompound: true,
    compoundShort: ["salomon", "solomon"]
  }
};

const countries = [];

for (const [code, es] of esMap.entries()) {
  const en = enMap.get(code);
  if (!en) {
    throw new Error(`Missing EN entry for ${code}`);
  }

  // Comprobar si el nombre contiene palabras compuestas
  const wordsEs = es.name.split(/\s+/).filter(w => !['del', 'de', 'la', 'las', 'los', 'el', 'y', 'and', 'the', 'of'].includes(w.toLowerCase()));
  const wordsEn = en.name.split(/\s+/).filter(w => !['del', 'de', 'la', 'las', 'los', 'el', 'y', 'and', 'the', 'of'].includes(w.toLowerCase()));
  const isAutoCompound = wordsEs.length > 1 || wordsEn.length > 1 || es.name.includes('-') || en.name.includes('-');

  const override = customOverrides[code] || {};

  // Extraer paréntesis si los hay, ej. Birmania (Myanmar)
  const extractParenAliases = (name) => {
    const match = name.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      return [match[1].trim(), match[2].trim()];
    }
    return [];
  };

  const extraEs = extractParenAliases(es.name);
  const extraEn = extractParenAliases(en.name);

  const cleanNameEs = es.name.replace(/\s*\(.*?\)/, '').trim();
  const cleanNameEn = en.name.replace(/\s*\(.*?\)/, '').trim();

  const aliasesEsSet = new Set([...(override.aliasesEs || []), ...extraEs]);
  const aliasesEnSet = new Set([...(override.aliasesEn || []), ...extraEn]);

  if (cleanNameEs !== es.name) aliasesEsSet.add(cleanNameEs);
  if (cleanNameEn !== en.name) aliasesEnSet.add(cleanNameEn);

  const country = {
    code,
    nameEs: es.name,
    nameEn: en.name,
    capitalEs: es.capital,
    capitalEn: en.capital,
    continentEs: es.continent,
    continentEn: en.continent,
    flagUrl: `/flags/${code}.svg`,
    aliasesEs: Array.from(aliasesEsSet),
    aliasesEn: Array.from(aliasesEnSet),
    isCompound: override.isCompound ?? isAutoCompound,
    compoundShort: override.compoundShort || []
  };

  countries.push(country);
}

// Ordenar alfabéticamente por nombre en español por defecto
countries.sort((a, b) => a.nameEs.localeCompare(b.nameEs, 'es'));

const outputCode = `// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Dataset oficial inmutable de los 196 países del quiz con banderas locales y alias.
 * @spec REQ-01, REQ-04
 */

import type { Country } from '../common/types/country';

export const COUNTRIES: readonly Country[] = ${JSON.stringify(countries, null, 2)} as const;

export const COUNTRIES_BY_CODE: ReadonlyMap<string, Country> = new Map(
  COUNTRIES.map((c) => [c.code, c])
);
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/countries.data.ts', outputCode, 'utf8');
console.log(`Generated src/data/countries.data.ts with ${countries.length} countries.`);
