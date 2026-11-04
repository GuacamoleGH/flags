# 🧠 Memory & ADRs: GuacamoleGH Flags

## Architecture Decision Records (ADRs)

### ADR-01: Full-Stack Homelab Soberano sin dependencias Cloud
- **Contexto:** Se requiere un sistema de quiz, usuarios, rankings e historial para `flags.guacamolegh.es`.
- **Decisión:** Usar Node.js 22+ con SQLite nativo (`node:sqlite DatabaseSync`), WAL mode, `bcryptjs` y JWT. Cero dependencia de servicios cloud externos (sin Firebase/Supabase).
- **Consecuencia:** Portabilidad 100% homelab, latencia ultrabaja, volumen persistente Docker en `./data:/app/data`.

### ADR-02: Dataset Oficial de 196 Países y Banderas Vectoriales
- **Contexto:** El usuario suministró `paises_es.md`, `paises_en.md` y `svg/` con 196 países exactos.
- **Decisión:** Los códigos ISO-2 son el identificador inmutable. Las banderas SVG se sirven localmente. Se estructuran alias en español e inglés y reglas para países compuestos (`Sao Tome` -> `São Tomé and Príncipe`, `Macedonia` -> `North Macedonia`).
- **Consecuencia:** 0 peticiones externas, rendering nítido de banderas con relación 3:2 sin deformarse, offline total.

### ADR-03: Validación Antifraude en Backend
- **Contexto:** Prevenir manipulación de rankings mediante envíos directos de tiempos falsos.
- **Decisión:** El backend valida duraciones mínimas realistas, correlación de número de respuestas y estado de partida antes de registrar récords en la tabla de líderes.
- **Consecuencia:** Integridad y datos reales en el leaderboard global.
