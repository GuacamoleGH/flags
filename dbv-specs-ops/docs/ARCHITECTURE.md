# 🏗️ Arquitectura Técnica: GuacamoleGH Flags

> **Proyecto:** GuacamoleGH Flags (Country Flag Quiz)
> **Dominio:** `flags.guacamolegh.es`
> **Fase:** DBV SDD v3.2.0

---

## 🛠️ 1. Stack Tecnológico

| Capa | Tecnología | Justificación |
| --- | --- | --- |
| **Frontend Bundler** | Vite 6.x | Empaquetado estático rápido, ESM nativo y rendimiento óptimo. |
| **Lenguaje** | TypeScript 5.x | Tipado estático estricto para modelos de datos y validaciones. |
| **Estilos** | CSS3 Moderno + Custom Properties | Tokens de diseño GuacamoleGH (gama carbón y acentos verde/turquesa). |
| **Backend & API** | Node.js 22 LTS + Express | API REST liviana para autenticación, rankings y partidas. |
| **Base de Datos** | SQLite (`node:sqlite DatabaseSync`) | Base de datos relacional embebida local, modo WAL, cero configuración. |
| **Seguridad** | `bcryptjs` + JWT | Hashing seguro de credenciales y tokens de sesión firmados. |
| **Testing** | Vitest + Happy-DOM | Pruebas unitarias para validación de nombres, alias y APIs. |
| **Despliegue** | Docker Compose | Contenedor soberano listo para homelab en `flags.guacamolegh.es`. |

---

## 📂 2. Estructura de Directorios

```text
/
├── data/                    # Persistencia SQLite (flags.db) ignorada en git
├── dbv-specs-ops/           # Gobernanza DBV (especificaciones y memoria)
├── public/                  # Assets estáticos, robots.txt, llms.txt, flags/
├── server/                  # Servidor Express, base de datos SQLite y rutas API
│   ├── db/                  # Conector SQLite y esquema SQL
│   ├── middleware/          # Autenticación JWT y validación
│   ├── routes/              # auth, scores, leaderboard, users, history
│   └── index.ts             # Entrada del servidor HTTP
├── src/                     # Frontend cliente
│   ├── common/              # Estilos (tokens, reset, main), i18n y componentes
│   ├── data/                # Dataset estructurado de los 196 países
│   ├── quiz/                # Lógica del motor del quiz, timer y normalizador
│   └── main.ts              # Orquestador del frontend y enrutador SPA
├── tests/                   # Pruebas unitarias con Vitest
├── docker-compose.yml       # Orquestación Docker
├── Dockerfile               # Multi-stage build
└── package.json
```
