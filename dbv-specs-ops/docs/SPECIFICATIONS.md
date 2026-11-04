# 📋 Especificaciones: GuacamoleGH Flags

> **Proyecto:** GuacamoleGH Flags (Country Flag Quiz)
> **Dominio:** `flags.guacamolegh.es`
> **Metodología:** DBV Specs Ops v3.2.0

---

## 🎯 1. Contexto y Objetivos

- **Propósito:** Proporcionar una aplicación web interactiva, moderna y minimalista para poner a prueba el conocimiento de las banderas de los 196 países oficiales del mundo en el menor tiempo posible.
- **Identidad de Marca:** Perteneciente al homelab GuacamoleGH, compartiendo el lenguaje visual tecnológico oscuro carbón con acentos verde/turquesa de GuacamoleGH Games.

---

## 👥 2. Requisitos Funcionales (RF)

- **REQ-01 · Listado Oficial de 196 Países:** Incorporar de manera estructurada los 196 países oficiales suministrados (`paises_es.md` y `paises_en.md`), vinculados a sus respectivas banderas SVG (`svg/`).
- **REQ-02 · Cuadrícula Responsive Horizontal:** Presentar las banderas en una rejilla amplia y horizontal (múltiples columnas aprovechando el ancho de pantalla en escritorio, adaptándose fluidamente en tablets y móviles). Cada elemento contiene la bandera y un campo de respuesta compacto.
- **REQ-03 · Validación de Respuestas Dinámica:**
  - El usuario puede responder las banderas en cualquier orden.
  - Al introducir la respuesta correcta, la tarjeta se marca visualmente como completada, se bloquea el campo de respuesta y se actualiza el contador.
  - No se permite autocompletado agresivo para nombres simples (ej. escribir `esp` no debe validar `España`).
- **REQ-04 · Autocompletado y Reconocimiento de Países Compuestos:**
  - Reconocimiento de abreviaciones inequívocas para países compuestos (ej. `Sao Tome` -> `São Tomé and Príncipe`, `Macedonia` -> `North Macedonia`).
  - Tolerancia de mayúsculas/minúsculas, tildes y diacríticos.
- **REQ-05 · Cronómetro y Estadísticas:**
  - El cronómetro se inicia al pulsar "Start Quiz".
  - Muestra tiempo transcurrido, aciertos (`X / 196`) y países pendientes.
  - Botones para iniciar, abandonar (revelar resultados) y reiniciar.
  - Pantalla final al terminar o abandonar con tiempo, países acertados, porcentaje y récord personal.
- **REQ-06 · Soporte Bilingüe (Español / English):**
  - Selector de idioma en cabecera.
  - Cambiar de idioma no resetea la partida ni las respuestas acertadas.
  - Traduce toda la UI y admite nombres y alias en el idioma seleccionado.
- **REQ-07 · Sistema de Usuarios y Autenticación:**
  - Registro e inicio de sesión local con contraseñas hasheadas (`bcryptjs`).
  - Sesiones seguras mediante JWT.
  - Modo invitado para jugar sin iniciar sesión (con persistencia local de récord).
- **REQ-08 · Rankings Globales:**
  - Tabla global de mejores tiempos al completar los 196 países.
  - Indicación de posición, avatar, tiempo y fecha.
  - Destacado del récord propio del usuario activo.
- **REQ-09 · Perfiles de Jugador:**
  - Perfil público accesible desde los rankings.
  - Perfil privado con selector de avatar, estadísticas completas e historial.
- **REQ-10 · Historial de Partidas:**
  - Registro cronológico de partidas (completadas y abandonadas).
  - Tiempos, aciertos, fecha y nuevos récords.
- **REQ-11 · Despliegue Homelab y Cero Dependencias Cloud:**
  - Docker Compose con volumen persistente en `./data:/app/data`.
  - Endpoint de healthcheck en `/api/health`.
  - Preparado para reverse proxy en `flags.guacamolegh.es`.

---

## 🛡️ 3. Requisitos No Funcionales (RNF)

- **RNF-01 · Rendimiento y Ligereza:** Carga instantánea con banderas SVG optimizadas y bundle Vite mínimo.
- **RNF-02 · Accesibilidad (WCAG 2.1 AA):** Contraste visual adecuado, foco accesible y navegación por teclado.
- **RNF-03 · Soberanía de Datos:** 100% autohospedado en SQLite sin servicios de terceros.
- **RNF-04 · Agent Readiness:** `robots.txt` y `llms.txt` disponibles en raíz.
