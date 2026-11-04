// =============================================================================
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

export const COUNTRIES: readonly Country[] = [
  {
    "code": "af",
    "nameEs": "Afganistán",
    "nameEn": "Afghanistan",
    "capitalEs": "Kabul",
    "capitalEn": "Kabul",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/af.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "al",
    "nameEs": "Albania",
    "nameEn": "Albania",
    "capitalEs": "Tirana",
    "capitalEn": "Tirana",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/al.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "de",
    "nameEs": "Alemania",
    "nameEn": "Germany",
    "capitalEs": "Berlín",
    "capitalEn": "Berlin",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/de.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ad",
    "nameEs": "Andorra",
    "nameEn": "Andorra",
    "capitalEs": "Andorra la Vieja",
    "capitalEn": "Andorra la Vella",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/ad.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ao",
    "nameEs": "Angola",
    "nameEn": "Angola",
    "capitalEs": "Luanda",
    "capitalEn": "Luanda",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ao.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ag",
    "nameEs": "Antigua y Barbuda",
    "nameEn": "Antigua and Barbuda",
    "capitalEs": "Saint John's",
    "capitalEn": "Saint John's",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/ag.svg",
    "aliasesEs": [
      "Antigua"
    ],
    "aliasesEn": [
      "Antigua"
    ],
    "isCompound": true,
    "compoundShort": [
      "antigua"
    ]
  },
  {
    "code": "sa",
    "nameEs": "Arabia Saudita",
    "nameEn": "Saudi Arabia",
    "capitalEs": "Riad",
    "capitalEn": "Riyadh",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/sa.svg",
    "aliasesEs": [
      "Arabia Saudí",
      "Reino de Arabia Saudita"
    ],
    "aliasesEn": [
      "KSA",
      "Kingdom of Saudi Arabia"
    ],
    "isCompound": true,
    "compoundShort": [
      "arabia saudita",
      "saudi arabia",
      "arabia saudi"
    ]
  },
  {
    "code": "dz",
    "nameEs": "Argelia",
    "nameEn": "Algeria",
    "capitalEs": "Argel",
    "capitalEn": "Algiers",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/dz.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ar",
    "nameEs": "Argentina",
    "nameEn": "Argentina",
    "capitalEs": "Buenos Aires",
    "capitalEn": "Buenos Aires",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/ar.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "am",
    "nameEs": "Armenia",
    "nameEn": "Armenia",
    "capitalEs": "Ereván",
    "capitalEn": "Yerevan",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/am.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "au",
    "nameEs": "Australia",
    "nameEn": "Australia",
    "capitalEs": "Canberra",
    "capitalEn": "Canberra",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/au.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "at",
    "nameEs": "Austria",
    "nameEn": "Austria",
    "capitalEs": "Viena",
    "capitalEn": "Vienna",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/at.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "az",
    "nameEs": "Azerbaiyán",
    "nameEn": "Azerbaijan",
    "capitalEs": "Bakú",
    "capitalEn": "Baku",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/az.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bs",
    "nameEs": "Bahamas",
    "nameEn": "Bahamas",
    "capitalEs": "Nassau",
    "capitalEn": "Nassau",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/bs.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bh",
    "nameEs": "Bahréin",
    "nameEn": "Bahrain",
    "capitalEs": "Manama",
    "capitalEn": "Manama",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/bh.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bd",
    "nameEs": "Bangladesh",
    "nameEn": "Bangladesh",
    "capitalEs": "Dacca",
    "capitalEn": "Dhaka",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/bd.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bb",
    "nameEs": "Barbados",
    "nameEn": "Barbados",
    "capitalEs": "Bridgetown",
    "capitalEn": "Bridgetown",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/bb.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "be",
    "nameEs": "Bélgica",
    "nameEn": "Belgium",
    "capitalEs": "Bruselas",
    "capitalEn": "Brussels",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/be.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bz",
    "nameEs": "Belice",
    "nameEn": "Belize",
    "capitalEs": "Belmopán",
    "capitalEn": "Belmopan",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/bz.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bj",
    "nameEs": "Benín",
    "nameEn": "Benin",
    "capitalEs": "Porto Novo / Cotonou",
    "capitalEn": "Porto-Novo / Cotonou",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/bj.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "by",
    "nameEs": "Bielorrusia",
    "nameEn": "Belarus",
    "capitalEs": "Minsk",
    "capitalEn": "Minsk",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/by.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mm",
    "nameEs": "Birmania (Myanmar)",
    "nameEn": "Myanmar",
    "capitalEs": "Naypyidaw",
    "capitalEn": "Naypyidaw",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/mm.svg",
    "aliasesEs": [
      "Birmania",
      "Myanmar"
    ],
    "aliasesEn": [
      "Burma",
      "Myanmar"
    ],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bo",
    "nameEs": "Bolivia",
    "nameEn": "Bolivia",
    "capitalEs": "Sucre / La Paz",
    "capitalEn": "Sucre / La Paz",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/bo.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ba",
    "nameEs": "Bosnia y Herzegovina",
    "nameEn": "Bosnia and Herzegovina",
    "capitalEs": "Sarajevo",
    "capitalEn": "Sarajevo",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/ba.svg",
    "aliasesEs": [
      "Bosnia",
      "Bosnia-Herzegovina"
    ],
    "aliasesEn": [
      "Bosnia",
      "Bosnia-Herzegovina"
    ],
    "isCompound": true,
    "compoundShort": [
      "bosnia"
    ]
  },
  {
    "code": "bw",
    "nameEs": "Botsuana",
    "nameEn": "Botswana",
    "capitalEs": "Gaborone",
    "capitalEn": "Gaborone",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/bw.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "br",
    "nameEs": "Brasil",
    "nameEn": "Brazil",
    "capitalEs": "Brasilia",
    "capitalEn": "Brasilia",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/br.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bn",
    "nameEs": "Brunéi",
    "nameEn": "Brunei",
    "capitalEs": "Bandar Seri Begawan",
    "capitalEn": "Bandar Seri Begawan",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/bn.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bg",
    "nameEs": "Bulgaria",
    "nameEn": "Bulgaria",
    "capitalEs": "Sofía",
    "capitalEn": "Sofia",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/bg.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bf",
    "nameEs": "Burkina Faso",
    "nameEn": "Burkina Faso",
    "capitalEs": "Uagadugú",
    "capitalEn": "Ouagadougou",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/bf.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": true,
    "compoundShort": []
  },
  {
    "code": "bi",
    "nameEs": "Burundi",
    "nameEn": "Burundi",
    "capitalEs": "Gitega / Buyumbura",
    "capitalEn": "Gitega / Bujumbura",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/bi.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "bt",
    "nameEs": "Bután",
    "nameEn": "Bhutan",
    "capitalEs": "Timbu",
    "capitalEn": "Thimphu",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/bt.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "cv",
    "nameEs": "Cabo Verde",
    "nameEn": "Cape Verde",
    "capitalEs": "Praia",
    "capitalEn": "Praia",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/cv.svg",
    "aliasesEs": [
      "Cape Verde"
    ],
    "aliasesEn": [
      "Cabo Verde"
    ],
    "isCompound": true,
    "compoundShort": [
      "cabo verde",
      "cape verde"
    ]
  },
  {
    "code": "kh",
    "nameEs": "Camboya",
    "nameEn": "Cambodia",
    "capitalEs": "Phnom Penh",
    "capitalEn": "Phnom Penh",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/kh.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "cm",
    "nameEs": "Camerún",
    "nameEn": "Cameroon",
    "capitalEs": "Yaundé",
    "capitalEn": "Yaounde",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/cm.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ca",
    "nameEs": "Canadá",
    "nameEn": "Canada",
    "capitalEs": "Ottawa",
    "capitalEn": "Ottawa",
    "continentEs": "América del Norte",
    "continentEn": "North America",
    "flagUrl": "/flags/ca.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "qa",
    "nameEs": "Catar",
    "nameEn": "Qatar",
    "capitalEs": "Doha",
    "capitalEn": "Doha",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/qa.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "td",
    "nameEs": "Chad",
    "nameEn": "Chad",
    "capitalEs": "Yamena",
    "capitalEn": "N'Djamena",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/td.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "cl",
    "nameEs": "Chile",
    "nameEn": "Chile",
    "capitalEs": "Santiago / Valparaíso",
    "capitalEn": "Santiago / Valparaiso",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/cl.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "cn",
    "nameEs": "China",
    "nameEn": "China",
    "capitalEs": "Pekín",
    "capitalEn": "Beijing",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/cn.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "cy",
    "nameEs": "Chipre",
    "nameEn": "Cyprus",
    "capitalEs": "Nicosia",
    "capitalEn": "Nicosia",
    "continentEs": "Asia-Europa",
    "continentEn": "Asia-Europe",
    "flagUrl": "/flags/cy.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "va",
    "nameEs": "Ciudad del Vaticano",
    "nameEn": "Vatican City",
    "capitalEs": "Ciudad del Vaticano",
    "capitalEn": "Vatican City",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/va.svg",
    "aliasesEs": [
      "Vaticano",
      "Santa Sede"
    ],
    "aliasesEn": [
      "Vatican",
      "Holy See"
    ],
    "isCompound": true,
    "compoundShort": [
      "vaticano",
      "vatican",
      "santa sede",
      "holy see"
    ]
  },
  {
    "code": "co",
    "nameEs": "Colombia",
    "nameEn": "Colombia",
    "capitalEs": "Bogotá",
    "capitalEn": "Bogota",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/co.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "km",
    "nameEs": "Comoras",
    "nameEn": "Comoros",
    "capitalEs": "Moroni",
    "capitalEn": "Moroni",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/km.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "kp",
    "nameEs": "Corea del Norte",
    "nameEn": "North Korea",
    "capitalEs": "Pyongyang",
    "capitalEn": "Pyongyang",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/kp.svg",
    "aliasesEs": [
      "Corea Norte",
      "RPDC"
    ],
    "aliasesEn": [
      "DPRK",
      "Democratic People's Republic of Korea",
      "Korea North"
    ],
    "isCompound": true,
    "compoundShort": [
      "corea del norte",
      "north korea"
    ]
  },
  {
    "code": "kr",
    "nameEs": "Corea del Sur",
    "nameEn": "South Korea",
    "capitalEs": "Seúl",
    "capitalEn": "Seoul",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/kr.svg",
    "aliasesEs": [
      "Corea Sur",
      "República de Corea"
    ],
    "aliasesEn": [
      "Republic of Korea",
      "Korea South"
    ],
    "isCompound": true,
    "compoundShort": [
      "corea del sur",
      "south korea"
    ]
  },
  {
    "code": "ci",
    "nameEs": "Costa de Marfil",
    "nameEn": "Ivory Coast",
    "capitalEs": "Yamusukro / Abiyán",
    "capitalEn": "Yamoussoukro / Abidjan",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ci.svg",
    "aliasesEs": [
      "Cote d'Ivoire",
      "Côte d'Ivoire"
    ],
    "aliasesEn": [
      "Cote d'Ivoire",
      "Côte d'Ivoire"
    ],
    "isCompound": true,
    "compoundShort": [
      "costa de marfil",
      "ivory coast",
      "cote d ivoire"
    ]
  },
  {
    "code": "cr",
    "nameEs": "Costa Rica",
    "nameEn": "Costa Rica",
    "capitalEs": "San José",
    "capitalEn": "San Jose",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/cr.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": true,
    "compoundShort": [
      "costa rica"
    ]
  },
  {
    "code": "hr",
    "nameEs": "Croacia",
    "nameEn": "Croatia",
    "capitalEs": "Zagreb",
    "capitalEn": "Zagreb",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/hr.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "cu",
    "nameEs": "Cuba",
    "nameEn": "Cuba",
    "capitalEs": "La Habana",
    "capitalEn": "Havana",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/cu.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "dk",
    "nameEs": "Dinamarca",
    "nameEn": "Denmark",
    "capitalEs": "Copenhague",
    "capitalEn": "Copenhagen",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/dk.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "dm",
    "nameEs": "Dominica",
    "nameEn": "Dominica",
    "capitalEs": "Roseau",
    "capitalEn": "Roseau",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/dm.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ec",
    "nameEs": "Ecuador",
    "nameEn": "Ecuador",
    "capitalEs": "Quito",
    "capitalEn": "Quito",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/ec.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "eg",
    "nameEs": "Egipto",
    "nameEn": "Egypt",
    "capitalEs": "El Cairo",
    "capitalEn": "Cairo",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/eg.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "sv",
    "nameEs": "El Salvador",
    "nameEn": "El Salvador",
    "capitalEs": "San Salvador",
    "capitalEn": "San Salvador",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/sv.svg",
    "aliasesEs": [
      "Salvador"
    ],
    "aliasesEn": [
      "Salvador"
    ],
    "isCompound": true,
    "compoundShort": [
      "el salvador",
      "salvador"
    ]
  },
  {
    "code": "ae",
    "nameEs": "Emiratos Árabes Unidos",
    "nameEn": "United Arab Emirates",
    "capitalEs": "Abu Dhabi",
    "capitalEn": "Abu Dhabi",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/ae.svg",
    "aliasesEs": [
      "Emiratos Árabes",
      "EAU",
      "Emiratos"
    ],
    "aliasesEn": [
      "UAE",
      "Emirates"
    ],
    "isCompound": true,
    "compoundShort": [
      "eau",
      "uae",
      "emiratos",
      "emirates"
    ]
  },
  {
    "code": "er",
    "nameEs": "Eritrea",
    "nameEn": "Eritrea",
    "capitalEs": "Asmara",
    "capitalEn": "Asmara",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/er.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "sk",
    "nameEs": "Eslovaquia",
    "nameEn": "Slovakia",
    "capitalEs": "Bratislava",
    "capitalEn": "Bratislava",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/sk.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "si",
    "nameEs": "Eslovenia",
    "nameEn": "Slovenia",
    "capitalEs": "Liubliana",
    "capitalEn": "Ljubljana",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/si.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "es",
    "nameEs": "España",
    "nameEn": "Spain",
    "capitalEs": "Madrid",
    "capitalEn": "Madrid",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/es.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "us",
    "nameEs": "Estados Unidos",
    "nameEn": "United States",
    "capitalEs": "Washington D.C.",
    "capitalEn": "Washington D.C.",
    "continentEs": "América del Norte",
    "continentEn": "North America",
    "flagUrl": "/flags/us.svg",
    "aliasesEs": [
      "EEUU",
      "EE.UU.",
      "Estados Unidos de América",
      "EUA"
    ],
    "aliasesEn": [
      "USA",
      "U.S.A.",
      "United States of America",
      "US",
      "America"
    ],
    "isCompound": true,
    "compoundShort": [
      "usa",
      "eeuu",
      "estados unidos",
      "united states",
      "america"
    ]
  },
  {
    "code": "ee",
    "nameEs": "Estonia",
    "nameEn": "Estonia",
    "capitalEs": "Tallin",
    "capitalEn": "Tallinn",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/ee.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "sz",
    "nameEs": "Eswatini",
    "nameEn": "Eswatini",
    "capitalEs": "Lobamba / Mbabane",
    "capitalEn": "Lobamba / Mbabane",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/sz.svg",
    "aliasesEs": [
      "Suazilandia",
      "Esuatini",
      "Eswatini"
    ],
    "aliasesEn": [
      "Swaziland",
      "Eswatini"
    ],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "et",
    "nameEs": "Etiopía",
    "nameEn": "Ethiopia",
    "capitalEs": "Adís Abeba",
    "capitalEn": "Addis Ababa",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/et.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ph",
    "nameEs": "Filipinas",
    "nameEn": "Philippines",
    "capitalEs": "Manila",
    "capitalEn": "Manila",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/ph.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "fi",
    "nameEs": "Finlandia",
    "nameEn": "Finland",
    "capitalEs": "Helsinki",
    "capitalEn": "Helsinki",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/fi.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "fj",
    "nameEs": "Fiyi",
    "nameEn": "Fiji",
    "capitalEs": "Suva",
    "capitalEn": "Suva",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/fj.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "fr",
    "nameEs": "Francia",
    "nameEn": "France",
    "capitalEs": "París",
    "capitalEn": "Paris",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/fr.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ga",
    "nameEs": "Gabón",
    "nameEn": "Gabon",
    "capitalEs": "Libreville",
    "capitalEn": "Libreville",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ga.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "gm",
    "nameEs": "Gambia",
    "nameEn": "Gambia",
    "capitalEs": "Banjul",
    "capitalEn": "Banjul",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/gm.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ge",
    "nameEs": "Georgia",
    "nameEn": "Georgia",
    "capitalEs": "Tiflis",
    "capitalEn": "Tbilisi",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/ge.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "gh",
    "nameEs": "Ghana",
    "nameEn": "Ghana",
    "capitalEs": "Accra",
    "capitalEn": "Accra",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/gh.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "gd",
    "nameEs": "Granada",
    "nameEn": "Grenada",
    "capitalEs": "Saint George",
    "capitalEn": "Saint George's",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/gd.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "gr",
    "nameEs": "Grecia",
    "nameEn": "Greece",
    "capitalEs": "Atenas",
    "capitalEn": "Athens",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/gr.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "gt",
    "nameEs": "Guatemala",
    "nameEn": "Guatemala",
    "capitalEs": "Ciudad de Guatemala",
    "capitalEn": "Guatemala City",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/gt.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "gn",
    "nameEs": "Guinea",
    "nameEn": "Guinea",
    "capitalEs": "Conakry",
    "capitalEn": "Conakry",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/gn.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "gq",
    "nameEs": "Guinea Ecuatorial",
    "nameEn": "Equatorial Guinea",
    "capitalEs": "Malabo",
    "capitalEn": "Malabo",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/gq.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": true,
    "compoundShort": [
      "guinea ecuatorial",
      "equatorial guinea"
    ]
  },
  {
    "code": "gw",
    "nameEs": "Guinea-Bissau",
    "nameEn": "Guinea-Bissau",
    "capitalEs": "Bissau",
    "capitalEn": "Bissau",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/gw.svg",
    "aliasesEs": [
      "Guinea Bisau",
      "Guinea-Bissau"
    ],
    "aliasesEn": [
      "Guinea Bissau"
    ],
    "isCompound": true,
    "compoundShort": [
      "guinea bisau",
      "guinea bissau"
    ]
  },
  {
    "code": "gy",
    "nameEs": "Guyana",
    "nameEn": "Guyana",
    "capitalEs": "Georgetown",
    "capitalEn": "Georgetown",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/gy.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ht",
    "nameEs": "Haití",
    "nameEn": "Haiti",
    "capitalEs": "Puerto Príncipe",
    "capitalEn": "Port-au-Prince",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/ht.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "hn",
    "nameEs": "Honduras",
    "nameEn": "Honduras",
    "capitalEs": "Tegucigalpa",
    "capitalEn": "Tegucigalpa",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/hn.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "hu",
    "nameEs": "Hungría",
    "nameEn": "Hungary",
    "capitalEs": "Budapest",
    "capitalEn": "Budapest",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/hu.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "in",
    "nameEs": "India",
    "nameEn": "India",
    "capitalEs": "Nueva Delhi",
    "capitalEn": "New Delhi",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/in.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "id",
    "nameEs": "Indonesia",
    "nameEn": "Indonesia",
    "capitalEs": "Yakarta",
    "capitalEn": "Jakarta",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/id.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "iq",
    "nameEs": "Irak",
    "nameEn": "Iraq",
    "capitalEs": "Bagdad",
    "capitalEn": "Baghdad",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/iq.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ir",
    "nameEs": "Irán",
    "nameEn": "Iran",
    "capitalEs": "Teherán",
    "capitalEn": "Tehran",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/ir.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ie",
    "nameEs": "Irlanda",
    "nameEn": "Ireland",
    "capitalEs": "Dublín",
    "capitalEn": "Dublin",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/ie.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "is",
    "nameEs": "Islandia",
    "nameEn": "Iceland",
    "capitalEs": "Reikiavik",
    "capitalEn": "Reykjavik",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/is.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mh",
    "nameEs": "Islas Marshall",
    "nameEn": "Marshall Islands",
    "capitalEs": "Majuro",
    "capitalEn": "Majuro",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/mh.svg",
    "aliasesEs": [
      "Marshall"
    ],
    "aliasesEn": [
      "Marshall"
    ],
    "isCompound": true,
    "compoundShort": [
      "marshall"
    ]
  },
  {
    "code": "sb",
    "nameEs": "Islas Salomón",
    "nameEn": "Solomon Islands",
    "capitalEs": "Honiara",
    "capitalEn": "Honiara",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/sb.svg",
    "aliasesEs": [
      "Salomon",
      "Salomón"
    ],
    "aliasesEn": [
      "Solomon"
    ],
    "isCompound": true,
    "compoundShort": [
      "salomon",
      "solomon"
    ]
  },
  {
    "code": "il",
    "nameEs": "Israel",
    "nameEn": "Israel",
    "capitalEs": "Jerusalén",
    "capitalEn": "Jerusalem",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/il.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "it",
    "nameEs": "Italia",
    "nameEn": "Italy",
    "capitalEs": "Roma",
    "capitalEn": "Rome",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/it.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "jm",
    "nameEs": "Jamaica",
    "nameEn": "Jamaica",
    "capitalEs": "Kingston",
    "capitalEn": "Kingston",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/jm.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "jp",
    "nameEs": "Japón",
    "nameEn": "Japan",
    "capitalEs": "Tokio",
    "capitalEn": "Tokyo",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/jp.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "jo",
    "nameEs": "Jordania",
    "nameEn": "Jordan",
    "capitalEs": "Amán",
    "capitalEn": "Amman",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/jo.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "kz",
    "nameEs": "Kazajistán",
    "nameEn": "Kazakhstan",
    "capitalEs": "Astaná",
    "capitalEn": "Astana",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/kz.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ke",
    "nameEs": "Kenia",
    "nameEn": "Kenya",
    "capitalEs": "Nairobi",
    "capitalEn": "Nairobi",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ke.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "kg",
    "nameEs": "Kirguistán",
    "nameEn": "Kyrgyzstan",
    "capitalEs": "Biskek",
    "capitalEn": "Bishkek",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/kg.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ki",
    "nameEs": "Kiribati",
    "nameEn": "Kiribati",
    "capitalEs": "Tarawa",
    "capitalEn": "Tarawa",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/ki.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "xk",
    "nameEs": "Kosovo",
    "nameEn": "Kosovo",
    "capitalEs": "Pristina",
    "capitalEn": "Pristina",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/xk.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "kw",
    "nameEs": "Kuwait",
    "nameEn": "Kuwait",
    "capitalEs": "Ciudad de Kuwait",
    "capitalEn": "Kuwait City",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/kw.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "la",
    "nameEs": "Laos",
    "nameEn": "Laos",
    "capitalEs": "Vientián",
    "capitalEn": "Vientiane",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/la.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ls",
    "nameEs": "Lesoto",
    "nameEn": "Lesotho",
    "capitalEs": "Maseru",
    "capitalEn": "Maseru",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ls.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "lv",
    "nameEs": "Letonia",
    "nameEn": "Latvia",
    "capitalEs": "Riga",
    "capitalEn": "Riga",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/lv.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "lb",
    "nameEs": "Líbano",
    "nameEn": "Lebanon",
    "capitalEs": "Beirut",
    "capitalEn": "Beirut",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/lb.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "lr",
    "nameEs": "Liberia",
    "nameEn": "Liberia",
    "capitalEs": "Monrovia",
    "capitalEn": "Monrovia",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/lr.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ly",
    "nameEs": "Libia",
    "nameEn": "Libya",
    "capitalEs": "Trípoli",
    "capitalEn": "Tripoli",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ly.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "li",
    "nameEs": "Liechtenstein",
    "nameEn": "Liechtenstein",
    "capitalEs": "Vaduz",
    "capitalEn": "Vaduz",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/li.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "lt",
    "nameEs": "Lituania",
    "nameEn": "Lithuania",
    "capitalEs": "Vilna",
    "capitalEn": "Vilnius",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/lt.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "lu",
    "nameEs": "Luxemburgo",
    "nameEn": "Luxembourg",
    "capitalEs": "Luxemburgo",
    "capitalEn": "Luxembourg",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/lu.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mk",
    "nameEs": "Macedonia del Norte",
    "nameEn": "North Macedonia",
    "capitalEs": "Skopie",
    "capitalEn": "Skopje",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/mk.svg",
    "aliasesEs": [
      "Macedonia",
      "ARYM",
      "Macedonia del N."
    ],
    "aliasesEn": [
      "Macedonia",
      "FYROM"
    ],
    "isCompound": true,
    "compoundShort": [
      "macedonia"
    ]
  },
  {
    "code": "mg",
    "nameEs": "Madagascar",
    "nameEn": "Madagascar",
    "capitalEs": "Antananarivo",
    "capitalEn": "Antananarivo",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/mg.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "my",
    "nameEs": "Malasia",
    "nameEn": "Malaysia",
    "capitalEs": "Kuala Lumpur / Putrajaya",
    "capitalEn": "Kuala Lumpur / Putrajaya",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/my.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mw",
    "nameEs": "Malaui",
    "nameEn": "Malawi",
    "capitalEs": "Lilongüe",
    "capitalEn": "Lilongwe",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/mw.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mv",
    "nameEs": "Maldivas",
    "nameEn": "Maldives",
    "capitalEs": "Malé",
    "capitalEn": "Male",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/mv.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ml",
    "nameEs": "Malí",
    "nameEn": "Mali",
    "capitalEs": "Bamako",
    "capitalEn": "Bamako",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ml.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mt",
    "nameEs": "Malta",
    "nameEn": "Malta",
    "capitalEs": "La Valeta",
    "capitalEn": "Valletta",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/mt.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ma",
    "nameEs": "Marruecos",
    "nameEn": "Morocco",
    "capitalEs": "Rabat",
    "capitalEn": "Rabat",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ma.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mu",
    "nameEs": "Mauricio",
    "nameEn": "Mauritius",
    "capitalEs": "Port Louis",
    "capitalEn": "Port Louis",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/mu.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mr",
    "nameEs": "Mauritania",
    "nameEn": "Mauritania",
    "capitalEs": "Nuakchot",
    "capitalEn": "Nouakchott",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/mr.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mx",
    "nameEs": "México",
    "nameEn": "Mexico",
    "capitalEs": "Ciudad de México",
    "capitalEn": "Mexico City",
    "continentEs": "América del Norte",
    "continentEn": "North America",
    "flagUrl": "/flags/mx.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "fm",
    "nameEs": "Micronesia",
    "nameEn": "Micronesia",
    "capitalEs": "Palikir",
    "capitalEn": "Palikir",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/fm.svg",
    "aliasesEs": [
      "Micronesia",
      "Estados Federados de Micronesia"
    ],
    "aliasesEn": [
      "Micronesia",
      "FSM"
    ],
    "isCompound": true,
    "compoundShort": [
      "micronesia"
    ]
  },
  {
    "code": "md",
    "nameEs": "Moldavia",
    "nameEn": "Moldova",
    "capitalEs": "Chisináu",
    "capitalEn": "Chisinau",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/md.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mc",
    "nameEs": "Mónaco",
    "nameEn": "Monaco",
    "capitalEs": "Mónaco",
    "capitalEn": "Monaco",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/mc.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mn",
    "nameEs": "Mongolia",
    "nameEn": "Mongolia",
    "capitalEs": "Ulán Bator",
    "capitalEn": "Ulaanbaatar",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/mn.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "me",
    "nameEs": "Montenegro",
    "nameEn": "Montenegro",
    "capitalEs": "Podgorica",
    "capitalEn": "Podgorica",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/me.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "mz",
    "nameEs": "Mozambique",
    "nameEn": "Mozambique",
    "capitalEs": "Maputo",
    "capitalEn": "Maputo",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/mz.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "na",
    "nameEs": "Namibia",
    "nameEn": "Namibia",
    "capitalEs": "Windhoek",
    "capitalEn": "Windhoek",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/na.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "nr",
    "nameEs": "Nauru",
    "nameEn": "Nauru",
    "capitalEs": "Yaren",
    "capitalEn": "Yaren",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/nr.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "np",
    "nameEs": "Nepal",
    "nameEn": "Nepal",
    "capitalEs": "Katmandú",
    "capitalEn": "Kathmandu",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/np.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ni",
    "nameEs": "Nicaragua",
    "nameEn": "Nicaragua",
    "capitalEs": "Managua",
    "capitalEn": "Managua",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/ni.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ne",
    "nameEs": "Níger",
    "nameEn": "Niger",
    "capitalEs": "Niamey",
    "capitalEn": "Niamey",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ne.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ng",
    "nameEs": "Nigeria",
    "nameEn": "Nigeria",
    "capitalEs": "Abuya",
    "capitalEn": "Abuja",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ng.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "no",
    "nameEs": "Noruega",
    "nameEn": "Norway",
    "capitalEs": "Oslo",
    "capitalEn": "Oslo",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/no.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "nz",
    "nameEs": "Nueva Zelanda",
    "nameEn": "New Zealand",
    "capitalEs": "Wellington",
    "capitalEn": "Wellington",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/nz.svg",
    "aliasesEs": [
      "Nueva Zelandia",
      "Aotearoa"
    ],
    "aliasesEn": [
      "Aotearoa"
    ],
    "isCompound": true,
    "compoundShort": [
      "nueva zelanda",
      "new zealand"
    ]
  },
  {
    "code": "om",
    "nameEs": "Omán",
    "nameEn": "Oman",
    "capitalEs": "Mascate",
    "capitalEn": "Muscat",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/om.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "nl",
    "nameEs": "Países Bajos",
    "nameEn": "Netherlands",
    "capitalEs": "Ámsterdam / La Haya",
    "capitalEn": "Amsterdam / The Hague",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/nl.svg",
    "aliasesEs": [
      "Holanda",
      "Paises Bajos"
    ],
    "aliasesEn": [
      "Holland",
      "The Netherlands"
    ],
    "isCompound": true,
    "compoundShort": [
      "holanda",
      "holland",
      "paises bajos",
      "netherlands"
    ]
  },
  {
    "code": "pk",
    "nameEs": "Pakistán",
    "nameEn": "Pakistan",
    "capitalEs": "Islamabad",
    "capitalEn": "Islamabad",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/pk.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "pw",
    "nameEs": "Palaos",
    "nameEn": "Palau",
    "capitalEs": "Ngerulmud / Melekeok",
    "capitalEn": "Ngerulmud / Melekeok",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/pw.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "pa",
    "nameEs": "Panamá",
    "nameEn": "Panama",
    "capitalEs": "Ciudad de Panamá",
    "capitalEn": "Panama City",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/pa.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "pg",
    "nameEs": "Papúa Nueva Guinea",
    "nameEn": "Papua New Guinea",
    "capitalEs": "Port Moresby",
    "capitalEn": "Port Moresby",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/pg.svg",
    "aliasesEs": [
      "Papua",
      "PNG"
    ],
    "aliasesEn": [
      "Papua",
      "PNG"
    ],
    "isCompound": true,
    "compoundShort": [
      "papua",
      "png"
    ]
  },
  {
    "code": "py",
    "nameEs": "Paraguay",
    "nameEn": "Paraguay",
    "capitalEs": "Asunción",
    "capitalEn": "Asuncion",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/py.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "pe",
    "nameEs": "Perú",
    "nameEn": "Peru",
    "capitalEs": "Lima",
    "capitalEn": "Lima",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/pe.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "pl",
    "nameEs": "Polonia",
    "nameEn": "Poland",
    "capitalEs": "Varsovia",
    "capitalEn": "Warsaw",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/pl.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "pt",
    "nameEs": "Portugal",
    "nameEn": "Portugal",
    "capitalEs": "Lisboa",
    "capitalEn": "Lisbon",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/pt.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "gb",
    "nameEs": "Reino Unido",
    "nameEn": "United Kingdom",
    "capitalEs": "Londres",
    "capitalEn": "London",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/gb.svg",
    "aliasesEs": [
      "Gran Bretaña",
      "Inglaterra",
      "UK"
    ],
    "aliasesEn": [
      "UK",
      "Great Britain",
      "Britain",
      "England"
    ],
    "isCompound": true,
    "compoundShort": [
      "uk",
      "reino unido",
      "gran bretana",
      "great britain"
    ]
  },
  {
    "code": "cf",
    "nameEs": "República Centroafricana",
    "nameEn": "Central African Republic",
    "capitalEs": "Bangui",
    "capitalEn": "Bangui",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/cf.svg",
    "aliasesEs": [
      "Centroáfrica",
      "RCA",
      "Rep. Centroafricana"
    ],
    "aliasesEn": [
      "CAR",
      "Central Africa",
      "Central African Rep"
    ],
    "isCompound": true,
    "compoundShort": [
      "rca",
      "car",
      "centroafrica",
      "central africa",
      "rep centroafricana"
    ]
  },
  {
    "code": "cz",
    "nameEs": "República Checa",
    "nameEn": "Czech Republic",
    "capitalEs": "Praga",
    "capitalEn": "Prague",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/cz.svg",
    "aliasesEs": [
      "República Checa",
      "Rep. Checa"
    ],
    "aliasesEn": [
      "Czechia",
      "Czech Rep"
    ],
    "isCompound": true,
    "compoundShort": [
      "chequia",
      "czechia",
      "republica checa",
      "czech republic"
    ]
  },
  {
    "code": "cg",
    "nameEs": "República del Congo",
    "nameEn": "Republic of the Congo",
    "capitalEs": "Brazzaville",
    "capitalEn": "Brazzaville",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/cg.svg",
    "aliasesEs": [
      "Congo Brazzaville",
      "Congo",
      "El Congo"
    ],
    "aliasesEn": [
      "Congo Brazzaville",
      "Congo Republic",
      "Congo"
    ],
    "isCompound": true,
    "compoundShort": [
      "congo brazzaville",
      "republica del congo",
      "republic of the congo"
    ]
  },
  {
    "code": "cd",
    "nameEs": "República Democrática del Congo",
    "nameEn": "D.R. Congo",
    "capitalEs": "Kinshasa",
    "capitalEn": "Kinshasa",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/cd.svg",
    "aliasesEs": [
      "RDC",
      "RD Congo",
      "Congo Kinshasa",
      "Congo Democrático",
      "Congo RDC"
    ],
    "aliasesEn": [
      "DR Congo",
      "DRC",
      "Congo Kinshasa",
      "Democratic Congo"
    ],
    "isCompound": true,
    "compoundShort": [
      "rdc",
      "drc",
      "rd congo",
      "dr congo",
      "congo kinshasa"
    ]
  },
  {
    "code": "do",
    "nameEs": "República Dominicana",
    "nameEn": "Dominican Republic",
    "capitalEs": "Santo Domingo",
    "capitalEn": "Santo Domingo",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/do.svg",
    "aliasesEs": [
      "Dominicana",
      "Rep. Dominicana",
      "Quisqueya"
    ],
    "aliasesEn": [
      "Dominican Rep",
      "Dominicana"
    ],
    "isCompound": true,
    "compoundShort": [
      "dominicana",
      "rep dominicana",
      "dominican rep"
    ]
  },
  {
    "code": "rw",
    "nameEs": "Ruanda",
    "nameEn": "Rwanda",
    "capitalEs": "Kigali",
    "capitalEn": "Kigali",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/rw.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ro",
    "nameEs": "Rumania",
    "nameEn": "Romania",
    "capitalEs": "Bucarest",
    "capitalEn": "Bucharest",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/ro.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ru",
    "nameEs": "Rusia",
    "nameEn": "Russia",
    "capitalEs": "Moscú",
    "capitalEn": "Moscow",
    "continentEs": "Europa-Asia",
    "continentEn": "Europe-Asia",
    "flagUrl": "/flags/ru.svg",
    "aliasesEs": [
      "Federación Rusa",
      "Federacion Rusa"
    ],
    "aliasesEn": [
      "Russian Federation"
    ],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ws",
    "nameEs": "Samoa",
    "nameEn": "Samoa",
    "capitalEs": "Apia",
    "capitalEn": "Apia",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/ws.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "kn",
    "nameEs": "San Cristóbal y Nieves",
    "nameEn": "Saint Kitts and Nevis",
    "capitalEs": "Basseterre",
    "capitalEn": "Basseterre",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/kn.svg",
    "aliasesEs": [
      "San Cristóbal",
      "St Kitts",
      "Saint Kitts y Nevis"
    ],
    "aliasesEn": [
      "St Kitts",
      "St. Kitts",
      "Saint Kitts"
    ],
    "isCompound": true,
    "compoundShort": [
      "st kitts",
      "san cristobal",
      "saint kitts"
    ]
  },
  {
    "code": "sm",
    "nameEs": "San Marino",
    "nameEn": "San Marino",
    "capitalEs": "San Marino",
    "capitalEn": "San Marino",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/sm.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": true,
    "compoundShort": [
      "san marino"
    ]
  },
  {
    "code": "vc",
    "nameEs": "San Vicente y las Granadinas",
    "nameEn": "Saint Vincent and the Grenadines",
    "capitalEs": "Kingstown",
    "capitalEn": "Kingstown",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/vc.svg",
    "aliasesEs": [
      "San Vicente",
      "St Vincent",
      "San Vicente y Granadinas"
    ],
    "aliasesEn": [
      "St Vincent",
      "St. Vincent",
      "Saint Vincent"
    ],
    "isCompound": true,
    "compoundShort": [
      "st vincent",
      "san vicente",
      "saint vincent"
    ]
  },
  {
    "code": "lc",
    "nameEs": "Santa Lucía",
    "nameEn": "Saint Lucia",
    "capitalEs": "Castries",
    "capitalEn": "Castries",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/lc.svg",
    "aliasesEs": [
      "St Lucia",
      "St. Lucía"
    ],
    "aliasesEn": [
      "St Lucia",
      "St. Lucia"
    ],
    "isCompound": true,
    "compoundShort": [
      "santa lucia",
      "st lucia"
    ]
  },
  {
    "code": "st",
    "nameEs": "Santo Tomé y Príncipe",
    "nameEn": "Sao Tome and Principe",
    "capitalEs": "Santo Tomé",
    "capitalEn": "Sao Tome",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/st.svg",
    "aliasesEs": [
      "Sao Tome y Principe",
      "Santo Tomé",
      "Sao Tome"
    ],
    "aliasesEn": [
      "Sao Tome",
      "Saint Thomas and Prince"
    ],
    "isCompound": true,
    "compoundShort": [
      "sao tome",
      "santo tome"
    ]
  },
  {
    "code": "sn",
    "nameEs": "Senegal",
    "nameEn": "Senegal",
    "capitalEs": "Dakar",
    "capitalEn": "Dakar",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/sn.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "rs",
    "nameEs": "Serbia",
    "nameEn": "Serbia",
    "capitalEs": "Belgrado",
    "capitalEn": "Belgrade",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/rs.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "sc",
    "nameEs": "Seychelles",
    "nameEn": "Seychelles",
    "capitalEs": "Victoria",
    "capitalEn": "Victoria",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/sc.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "sl",
    "nameEs": "Sierra Leona",
    "nameEn": "Sierra Leone",
    "capitalEs": "Freetown",
    "capitalEn": "Freetown",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/sl.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": true,
    "compoundShort": [
      "sierra leona",
      "sierra leone"
    ]
  },
  {
    "code": "sg",
    "nameEs": "Singapur",
    "nameEn": "Singapore",
    "capitalEs": "Singapur",
    "capitalEn": "Singapore",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/sg.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "sy",
    "nameEs": "Siria",
    "nameEn": "Syria",
    "capitalEs": "Damasco",
    "capitalEn": "Damascus",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/sy.svg",
    "aliasesEs": [
      "República Árabe Siria"
    ],
    "aliasesEn": [
      "Syrian Arab Republic"
    ],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "so",
    "nameEs": "Somalia",
    "nameEn": "Somalia",
    "capitalEs": "Mogadiscio",
    "capitalEn": "Mogadiscio",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/so.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "lk",
    "nameEs": "Sri Lanka",
    "nameEn": "Sri Lanka",
    "capitalEs": "Colombo / Sri Jayawardenepura Kotte",
    "capitalEn": "Colombo / Sri Jayawardenepura Kotte",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/lk.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": true,
    "compoundShort": []
  },
  {
    "code": "za",
    "nameEs": "Sudáfrica",
    "nameEn": "South Africa",
    "capitalEs": "Pretoria / Ciudad del Cabo / Bloemfontein",
    "capitalEn": "Pretoria / Cape Town / Bloemfontein",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/za.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": true,
    "compoundShort": []
  },
  {
    "code": "sd",
    "nameEs": "Sudán",
    "nameEn": "Sudan",
    "capitalEs": "Jartum",
    "capitalEn": "Khartoum",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/sd.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ss",
    "nameEs": "Sudán del Sur",
    "nameEn": "South Sudan",
    "capitalEs": "Yuba",
    "capitalEn": "Juba",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ss.svg",
    "aliasesEs": [
      "Sudan Sur",
      "Sudan del Sur"
    ],
    "aliasesEn": [
      "Sudan South"
    ],
    "isCompound": true,
    "compoundShort": [
      "sudan del sur",
      "south sudan"
    ]
  },
  {
    "code": "se",
    "nameEs": "Suecia",
    "nameEn": "Sweden",
    "capitalEs": "Estocolmo",
    "capitalEn": "Stockholm",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/se.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ch",
    "nameEs": "Suiza",
    "nameEn": "Switzerland",
    "capitalEs": "Berna",
    "capitalEn": "Bern",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/ch.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "sr",
    "nameEs": "Surinam",
    "nameEn": "Suriname",
    "capitalEs": "Paramaribo",
    "capitalEn": "Paramaribo",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/sr.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "th",
    "nameEs": "Tailandia",
    "nameEn": "Thailand",
    "capitalEs": "Bangkok",
    "capitalEn": "Bangkok",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/th.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "tw",
    "nameEs": "Taiwán",
    "nameEn": "Taiwan",
    "capitalEs": "Taipéi",
    "capitalEn": "Taipei",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/tw.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "tz",
    "nameEs": "Tanzania",
    "nameEn": "Tanzania",
    "capitalEs": "Dodoma",
    "capitalEn": "Dodoma",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/tz.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "tj",
    "nameEs": "Tayikistán",
    "nameEn": "Tajikistan",
    "capitalEs": "Dusambé",
    "capitalEn": "Dushanbe",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/tj.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "tl",
    "nameEs": "Timor Oriental",
    "nameEn": "East Timor",
    "capitalEs": "Dili",
    "capitalEn": "Dili",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/tl.svg",
    "aliasesEs": [
      "Timor-Leste",
      "Timor Leste",
      "Timor"
    ],
    "aliasesEn": [
      "Timor-Leste",
      "Timor Leste",
      "Timor"
    ],
    "isCompound": true,
    "compoundShort": [
      "timor"
    ]
  },
  {
    "code": "tg",
    "nameEs": "Togo",
    "nameEn": "Togo",
    "capitalEs": "Lomé",
    "capitalEn": "Lome",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/tg.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "to",
    "nameEs": "Tonga",
    "nameEn": "Tonga",
    "capitalEs": "Nukualofa",
    "capitalEn": "Nuku'alofa",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/to.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "tt",
    "nameEs": "Trinidad y Tobago",
    "nameEn": "Trinidad and Tobago",
    "capitalEs": "Puerto España",
    "capitalEn": "Port of Spain",
    "continentEs": "América Central",
    "continentEn": "Central America",
    "flagUrl": "/flags/tt.svg",
    "aliasesEs": [
      "Trinidad"
    ],
    "aliasesEn": [
      "Trinidad"
    ],
    "isCompound": true,
    "compoundShort": [
      "trinidad"
    ]
  },
  {
    "code": "tn",
    "nameEs": "Túnez",
    "nameEn": "Tunisia",
    "capitalEs": "Túnez",
    "capitalEn": "Tunis",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/tn.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "tm",
    "nameEs": "Turkmenistán",
    "nameEn": "Turkmenistan",
    "capitalEs": "Asjabad",
    "capitalEn": "Ashgabat",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/tm.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "tr",
    "nameEs": "Turquía",
    "nameEn": "Turkey",
    "capitalEs": "Ankara",
    "capitalEn": "Ankara",
    "continentEs": "Asia-Europa",
    "continentEn": "Asia-Europe",
    "flagUrl": "/flags/tr.svg",
    "aliasesEs": [
      "Türkiye",
      "Turquie"
    ],
    "aliasesEn": [
      "Turkiye",
      "Republic of Turkey"
    ],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "tv",
    "nameEs": "Tuvalu",
    "nameEn": "Tuvalu",
    "capitalEs": "Funafuti",
    "capitalEn": "Funafuti",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/tv.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ua",
    "nameEs": "Ucrania",
    "nameEn": "Ukraine",
    "capitalEs": "Kiev",
    "capitalEn": "Kyiv",
    "continentEs": "Europa",
    "continentEn": "Europe",
    "flagUrl": "/flags/ua.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ug",
    "nameEs": "Uganda",
    "nameEn": "Uganda",
    "capitalEs": "Kampala",
    "capitalEn": "Kampala",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/ug.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "uy",
    "nameEs": "Uruguay",
    "nameEn": "Uruguay",
    "capitalEs": "Montevideo",
    "capitalEn": "Montevideo",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/uy.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "uz",
    "nameEs": "Uzbekistán",
    "nameEn": "Uzbekistan",
    "capitalEs": "Taskent",
    "capitalEn": "Tashkent",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/uz.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "vu",
    "nameEs": "Vanuatu",
    "nameEn": "Vanuatu",
    "capitalEs": "Port Vila",
    "capitalEn": "Port Vila",
    "continentEs": "Oceanía",
    "continentEn": "Oceania",
    "flagUrl": "/flags/vu.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ve",
    "nameEs": "Venezuela",
    "nameEn": "Venezuela",
    "capitalEs": "Caracas",
    "capitalEn": "Caracas",
    "continentEs": "América del Sur",
    "continentEn": "South America",
    "flagUrl": "/flags/ve.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "vn",
    "nameEs": "Vietnam",
    "nameEn": "Vietnam",
    "capitalEs": "Hanói",
    "capitalEn": "Hanoi",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/vn.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "ye",
    "nameEs": "Yemen",
    "nameEn": "Yemen",
    "capitalEs": "Saná",
    "capitalEn": "Sana'a",
    "continentEs": "Asia",
    "continentEn": "Asia",
    "flagUrl": "/flags/ye.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "dj",
    "nameEs": "Yibuti",
    "nameEn": "Djibouti",
    "capitalEs": "Yibuti",
    "capitalEn": "Djibouti",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/dj.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "zm",
    "nameEs": "Zambia",
    "nameEn": "Zambia",
    "capitalEs": "Lusaka",
    "capitalEn": "Lusaka",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/zm.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  },
  {
    "code": "zw",
    "nameEs": "Zimbabue",
    "nameEn": "Zimbabwe",
    "capitalEs": "Harare",
    "capitalEn": "Harare",
    "continentEs": "África",
    "continentEn": "Africa",
    "flagUrl": "/flags/zw.svg",
    "aliasesEs": [],
    "aliasesEn": [],
    "isCompound": false,
    "compoundShort": []
  }
] as const;

export const COUNTRIES_BY_CODE: ReadonlyMap<string, Country> = new Map(
  COUNTRIES.map((c) => [c.code, c])
);
