# 🏳️ GuacamoleGH Flags — Country Flag Quiz

<div align="center">
  <p><strong>Quiz web interactivo bilingüe de banderas de los 196 países oficiales del mundo para el homelab GuacamoleGH</strong></p>
  <p>
    <img src="https://img.shields.io/badge/status-v1.0.0%20(196%20Banderas)-00f59b?style=flat-square" alt="Status" />
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
    <img src="https://img.shields.io/badge/methodology-DBV%20Specs%20Ops%20v3.2.0-00d9c4?style=flat-square" alt="Methodology" />
    <img src="https://img.shields.io/badge/tests-17%20passing-00d9c4?style=flat-square" alt="Tests" />
    <img src="https://img.shields.io/badge/docker-homelab%20ready-38bdf8?style=flat-square" alt="Docker" />
  </p>
</div>

---

## 📑 Índice

- [📌 Sobre el proyecto](#about)
- [🌍 Criterio y Listado Oficial de los 196 Países](#countries)
- [⚡ Diseño Horizontal Minimalista y Ergonomía](#design)
- [🌐 Soporte Bilingüe (Español / English)](#i18n)
- [🧠 Autocompletado Inteligente y Validación de Alias](#validation)
- [👤 Sistema de Cuentas, Rankings y Perfiles](#users)
- [🛡️ Anti-Trampas Heurístico](#anticheat)
- [🏠 Despliegue en Homelab (Docker Compose)](#homelab)
- [🛠️ Stack Tecnológico](#stack)
- [⚙️ Instalación y Desarrollo Local](#development)
- [🧪 Pruebas y Calidad](#testing)
- [📄 Licencia](#license)

---

<a name="about"></a>
## 📌 Sobre el proyecto

**GuacamoleGH Flags** es una aplicación web interactiva diseñada para desafiar el conocimiento geográfico mundial reconociendo las **196 banderas oficiales del planeta** en el menor tiempo posible.

Diseñada bajo la identidad visual tecnológica del homelab GuacamoleGH (gama carbón `#0c0e12` con acentos verde neón `#00f59b` y turquesa digital `#00d9c4`), ofrece una experiencia ágil, horizontal y fluida tanto en navegadores de escritorio como en dispositivos táctiles móviles.

---

<a name="countries"></a>
## 🌍 Criterio y Listado Oficial de los 196 Países

El catálogo de 196 países del quiz se fundamenta en el estándar internacional más extendido para juegos de banderas y estados soberanos:

1. **193 Estados miembros de las Naciones Unidas (ONU)**.
2. **2 Estados observadores permanentes de la Asamblea General de la ONU:**
   - **Ciudad del Vaticano** (Santa Sede / `va`).
   - **Estado de Palestina** (`ps`).
3. **1 Estado con soberanía de facto reconocida internacionalmente:**
   - **Taiwán** (República de China / `tw`) y reconocimiento de **Kosovo** (`xk`).

Cada uno de los 196 países dispone de:
- Identificador inmutable ISO-3166-1 alfa-2.
- Bandera vectorial local SVG optimizada (proporción oficial 3:2, sin deformación y 100% offline).
- Nombre oficial, capital y continente en español e inglés.
- Diccionario exhaustivo de alias oficiales y abreviaciones compuestas reconocidas.

---

<a name="design"></a>
## ⚡ Diseño Horizontal Minimalista y Ergonomía

A diferencia de los quizzes tradicionales verticales de una sola columna, **GuacamoleGH Flags** maximiza el espacio horizontal:
- **Cuadrícula adaptativa amplia**: 6 a 8 columnas de banderas en pantallas de escritorio panorámicas, 4 a 5 en portátiles, 3 en tablets y 2 en móviles.
- **Campo de respuesta integrado por bandera**: cada bandera tiene su campo de texto compacto justo debajo.
- **Enfoque automático al siguiente país**: al acertar una bandera, la tarjeta se bloquea con insignia verde y el cursor pasa automáticamente a la siguiente bandera pendiente, permitiendo récords de velocidad sin usar el ratón.
- **Libertad de resolución**: responde en cualquier orden.
- **Filtros por continente y búsqueda en caliente**: filtra rápidamente Europa, Asia, África, América u Oceanía.

---

<a name="i18n"></a>
## 🌐 Soporte Bilingüe (Español / English)

El selector de idioma en la barra superior permite alternar instantáneamente entre:
- **Español (ES)**
- **English (EN)**

> **Regla de oro de continuidad:** Cambiar el idioma **nunca reinicia el progreso de la partida en curso**.
> Las banderas ya acertadas actualizan su nombre al nuevo idioma seleccionado, y los inputs pendientes aceptan respuestas tanto en el idioma activo como en el secundario por cortesía.

---

<a name="validation"></a>
## 🧠 Autocompletado Inteligente y Validación de Alias

El motor de validación distingue estrictamente entre nombres simples y países compuestos para evitar falsos positivos:

### 1. Nombres Simples
- Requieren el nombre completo (ej: `España` o `Spain`).
- **No se permite autocompletado agresivo**: escribir `esp` o `Esp` **nunca** dará por buena a España.
- Tolerancia total a mayúsculas, minúsculas, espacios y tildes (`españa`, `espana`, `ESPAÑA`).

### 2. Países Compuestos (Atajos Inequívocos)
Aceptan nombres abreviados configurados tras pulsar Enter o confirmar:
- `Sao Tome` $\to$ **Santo Tomé y Príncipe** / **Sao Tome and Principe**
- `Macedonia` $\to$ **Macedonia del Norte** / **North Macedonia**
- `USA` / `EEUU` $\to$ **Estados Unidos** / **United States**
- `UK` $\to$ **Reino Unido** / **United Kingdom**
- `Emiratos` / `UAE` $\to$ **Emiratos Árabes Unidos** / **United Arab Emirates**
- `Holanda` / `Holland` $\to$ **Países Bajos** / **Netherlands**
- `Vaticano` / `Vatican` $\to$ **Ciudad del Vaticano** / **Vatican City**
- `Bosnia` $\to$ **Bosnia y Herzegovina**
- `Trinidad` $\to$ **Trinidad y Tobago**
- `Antigua` $\to$ **Antigua y Barbuda**
- `St Kitts` / `San Cristobal` $\to$ **San Cristóbal y Nieves**
- `St Vincent` / `San Vicente` $\to$ **San Vicente y las Granadinas**
- `St Lucia` $\to$ **Santa Lucía**
- `DR Congo` / `RD Congo` $\to$ **República Democrática del Congo**
- `Congo Brazzaville` $\to$ **República del Congo**
- `Dominicana` $\to$ **República Dominicana**

---

<a name="users"></a>
## 👤 Sistema de Cuentas, Rankings y Perfiles

- **Modo Invitado 100% Funcional**: Juega sin cuenta, mide tu tiempo y guarda tu récord local en `localStorage`.
- **Autenticación Soberana**: Registro e inicio de sesión con contraseñas cifradas mediante `bcryptjs` (salt rounds: 10) y sesiones JWT.
- **Rankings Globales (`#leaderboard`)**:
  - Tabla de mejores tiempos resolviendo las 196 banderas.
  - Resolución determinista de empates por orden de consecución.
  - Posición y tiempo destacado del usuario conectado.
- **Perfil de Jugador (`#profile`)**:
  - Vista pública y privada editable.
  - Selector de avatares arcade (`🚩 Flag Master`, `🧭 Brújula`, `🌍 Globo`, `🗺️ Explorador`, `🦅 Halcón`, `🕹️ Arcade`).
  - Estadísticas: mejor tiempo, total completadas, total jugadas y tasa de éxito.
- **Historial de Partidas (`#history`)**:
  - Registro de todas las partidas finalizadas o abandonadas.
  - Filtro por completadas/abandonadas y ordenación por fecha o tiempo.

---

<a name="anticheat"></a>
## 🛡️ Anti-Trampas Heurístico

El backend Express valida estrictamente las puntuaciones antes de registrarlas en el leaderboard:
- Tiempos físicamente imposibles (< 25 segundos para 196 banderas) son rechazados automáticamente con código HTTP 400.
- Validación de correspondencia entre estado completado y 196 aciertos exactos.
- Las partidas incompletas o abandonadas se registran en el historial personal, pero nunca entran en la tabla de récords globales.

---

<a name="homelab"></a>
## 🏠 Despliegue en Homelab (Docker Compose)

Diseñado para desplegarse de forma soberana detrás de Traefik, Caddy o Nginx en el subdominio `flags.guacamolegh.es`.

```bash
docker compose up -d --build
```

- **Puerto por defecto:** `${PORT:-3095}:3000`
- **Healthcheck:** `GET http://localhost:3095/api/health`
- **Volumen persistente:** `./data:/app/data` (base de datos `flags.db` en SQLite con modo WAL y secreto de firma).

---

<a name="stack"></a>
## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Frontend** | TypeScript 5, Vite 6, CSS3 Moderno (Custom Properties) |
| **Backend API** | Node.js 22 LTS, Express, TypeScript (`tsx`) |
| **Base de Datos** | SQLite (`node:sqlite DatabaseSync`) en modo WAL |
| **Seguridad** | `bcryptjs` + JWT |
| **Testing** | Vitest + Happy-DOM (17 pruebas automatizadas) |
| **Contenedores** | Docker multi-stage + Docker Compose |

---

<a name="development"></a>
## ⚙️ Instalación y Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (backend + API)
npm run dev:all

# 3. Compilar producción y verificar tipos
npm run build

# 4. Ejecutar tests
npm test
```

---

<a name="testing"></a>
## 🧪 Pruebas y Calidad

El proyecto incluye 17 tests unitarios y de integración:
- `tests/validation.test.ts`: Verificación de los 196 países únicos, normalización de acentos, rechazo estricto de prefijos (`esp` $\ne$ `España`), alias y compuestos.
- `tests/api.test.ts`: Healthcheck, registro y login con bcrypt, anti-cheat, envío de récords, ranking global, perfiles públicos e historial.

---

<a name="license"></a>
## 📄 Licencia

MIT License — Copyright (c) 2026 [GuacamoleGH](https://github.com/GuacamoleGH).
Construido con la metodología [dbv-specs-ops](https://github.com/davidbuenov/dbv-specs-ops).
