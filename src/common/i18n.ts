// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Sistema reactivo y tipado de internacionalización y temas.
 * @spec REQ-06
 */

import type { SupportedLanguage } from './types/country';

export const TRANSLATIONS = {
  es: {
    appTitle: 'GuacamoleGH Flags',
    appSubtitle: 'Quiz interactivo de banderas del mundo',
    navQuiz: 'Quiz',
    navLeaderboard: 'Rankings',
    navHistory: 'Historial',
    navProfile: 'Perfil',
    navLogin: 'Iniciar sesión',
    navRegister: 'Registrarse',
    navLogout: 'Cerrar sesión',
    guestUser: 'Invitado',

    // Modos de juego
    lblGameMode: 'Modo de juego',
    modeWorld: 'Mundo (196)',
    modeEurope: 'Europa',
    modeAsia: 'Asia',
    modeAfrica: 'África',
    modeAmericas: 'América',
    modeOceania: 'Oceanía',

    // HUD y controles
    btnStart: 'Iniciar Quiz',
    btnGiveUp: 'Rendirse',
    btnRestart: 'Reiniciar',
    btnPlayAgain: 'Jugar de nuevo',
    btnViewLeaderboard: 'Ver Rankings',
    btnPrev: '← Anterior',
    btnNext: 'Siguiente →',
    lblEnterCountry: 'Escribe el país:',
    lblTime: 'Tiempo',
    lblProgress: 'Puntuación',
    lblPending: 'Pendientes',
    lblCompleted: 'Completado',
    quizInstruction: 'Identifica las banderas. Empieza a escribir para iniciar el tiempo automáticamente.',
    placeholderAnswer: 'Escribe el país...',
    placeholderSearch: 'Buscar bandera...',
    compoundHint: 'Reconocido por abreviación',

    // Temas
    themeLight: 'Modo Claro',
    themeDark: 'Modo Oscuro',

    // Modales de resultados
    modalVictoryTitle: '¡Felicidades! ¡Quiz Completado!',
    modalGameOverTitle: 'Partida Finalizada',
    modalTotalTime: 'Tiempo total',
    modalGuessed: 'Países acertados',
    modalPercentage: 'Porcentaje',
    modalPersonalBest: '¡Nuevo Récord Personal!',
    modalGuestNotice: 'Inicia sesión o crea una cuenta para registrar tu récord en el ranking global.',
    modalSaveScore: 'Guardar Récord',

    // Rankings
    leaderboardTitle: 'Clasificación Global',
    leaderboardSubtitle: 'Los mejores tiempos completando banderas en cada modo',
    colRank: 'Posición',
    colPlayer: 'Jugador',
    colTime: 'Tiempo',
    colDate: 'Fecha',
    yourRankBanner: 'Tu mejor marca en este modo:',
    noRecords: 'Aún no hay récords registrados en este modo. ¡Sé el primero!',

    // Perfil
    profileTitle: 'Perfil de Jugador',
    lblMemberSince: 'Miembro desde',
    lblBestTime: 'Mejor tiempo',
    lblCompletedCount: 'Partidas completadas',
    lblPlayedCount: 'Partidas jugadas',
    lblAvgGuessed: 'Promedio de aciertos',
    lblEditAvatar: 'Elige tu avatar',
    btnSaveProfile: 'Guardar Cambios',
    profileUpdated: 'Avatar actualizado correctamente',

    // Historial
    historyTitle: 'Historial de Partidas',
    historySubtitle: 'Registro de tus partidas jugadas en GuacamoleGH Flags',
    filterAll: 'Todas',
    filterCompleted: 'Completadas',
    filterAbandoned: 'Abandonadas',
    sortDate: 'Más recientes',
    sortTime: 'Mejor tiempo',
    colStatus: 'Estado',
    statusCompleted: 'Completada',
    statusAbandoned: 'Abandonada',
    emptyHistory: 'Aún no has jugado partidas registradas con esta cuenta.',

    // Auth
    authLoginTitle: 'Iniciar Sesión',
    authRegisterTitle: 'Crear Cuenta',
    lblUsername: 'Nombre de usuario',
    lblPassword: 'Contraseña',
    lblAvatar: 'Avatar',
    btnLoginSubmit: 'Entrar',
    btnRegisterSubmit: 'Crear Cuenta',
    alreadyAccount: '¿Ya tienes cuenta? Inicia sesión',
    needAccount: '¿No tienes cuenta? Regístrate gratis',
    authSuccessLogin: '¡Bienvenido de nuevo!',
    authSuccessRegister: '¡Cuenta creada con éxito!'
  },
  en: {
    appTitle: 'GuacamoleGH Flags',
    appSubtitle: 'Interactive world flag quiz',
    navQuiz: 'Quiz',
    navLeaderboard: 'Leaderboard',
    navHistory: 'History',
    navProfile: 'Profile',
    navLogin: 'Log in',
    navRegister: 'Register',
    navLogout: 'Log out',
    guestUser: 'Guest',

    // Game modes
    lblGameMode: 'Game Mode',
    modeWorld: 'World (196)',
    modeEurope: 'Europe',
    modeAsia: 'Asia',
    modeAfrica: 'Africa',
    modeAmericas: 'Americas',
    modeOceania: 'Oceania',

    // HUD and controls
    btnStart: 'Start Quiz',
    btnGiveUp: 'Give Up',
    btnRestart: 'Restart',
    btnPlayAgain: 'Play Again',
    btnViewLeaderboard: 'View Leaderboard',
    btnPrev: '← Previous',
    btnNext: 'Next →',
    lblEnterCountry: 'Enter country:',
    lblTime: 'Time',
    lblProgress: 'Score',
    lblPending: 'Pending',
    lblCompleted: 'Completed',
    quizInstruction: 'Identify flags. Start typing to start timer automatically.',
    placeholderAnswer: 'Type country...',
    placeholderSearch: 'Search flag...',
    compoundHint: 'Recognized by shortcut',

    // Themes
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',

    // Results Modals
    modalVictoryTitle: 'Congratulations! Quiz Completed!',
    modalGameOverTitle: 'Game Over',
    modalTotalTime: 'Total Time',
    modalGuessed: 'Guessed Countries',
    modalPercentage: 'Completion',
    modalPersonalBest: 'New Personal Best!',
    modalGuestNotice: 'Log in or sign up to record your score on the global leaderboard.',
    modalSaveScore: 'Save Score',

    // Leaderboard
    leaderboardTitle: 'Global Leaderboard',
    leaderboardSubtitle: 'Fastest times identifying flags by game mode',
    colRank: 'Rank',
    colPlayer: 'Player',
    colTime: 'Time',
    colDate: 'Date',
    yourRankBanner: 'Your personal best in this mode:',
    noRecords: 'No records in this mode yet. Be the first!',

    // Profile
    profileTitle: 'Player Profile',
    lblMemberSince: 'Member since',
    lblBestTime: 'Best Time',
    lblCompletedCount: 'Games Completed',
    lblPlayedCount: 'Games Played',
    lblAvgGuessed: 'Average Guessed',
    lblEditAvatar: 'Choose your avatar',
    btnSaveProfile: 'Save Changes',
    profileUpdated: 'Avatar updated successfully',

    // History
    historyTitle: 'Match History',
    historySubtitle: 'Record of your matches on GuacamoleGH Flags',
    filterAll: 'All',
    filterCompleted: 'Completed',
    filterAbandoned: 'Abandoned',
    sortDate: 'Most Recent',
    sortTime: 'Best Time',
    colStatus: 'Status',
    statusCompleted: 'Completed',
    statusAbandoned: 'Abandoned',
    emptyHistory: 'No recorded games found for this account yet.',

    // Auth
    authLoginTitle: 'Log In',
    authRegisterTitle: 'Create Account',
    lblUsername: 'Username',
    lblPassword: 'Password',
    lblAvatar: 'Avatar',
    btnLoginSubmit: 'Sign In',
    btnRegisterSubmit: 'Sign Up',
    alreadyAccount: 'Already have an account? Log in',
    needAccount: "Don't have an account? Sign up",
    authSuccessLogin: 'Welcome back!',
    authSuccessRegister: 'Account created successfully!'
  }
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS['es'];

let currentLang: SupportedLanguage = (
  (typeof localStorage !== 'undefined' && localStorage.getItem('guacamolegh_flags_lang') as SupportedLanguage) || 'es'
);

const langListeners = new Set<(lang: SupportedLanguage) => void>();

export function getLanguage(): SupportedLanguage {
  return currentLang;
}

export function setLanguage(lang: SupportedLanguage): void {
  if (lang !== 'es' && lang !== 'en') return;
  currentLang = lang;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('guacamolegh_flags_lang', lang);
  }
  langListeners.forEach(fn => fn(lang));
}

export function onLanguageChange(fn: (lang: SupportedLanguage) => void): () => void {
  langListeners.add(fn);
  return () => langListeners.delete(fn);
}

export function t(key: TranslationKey): string {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS.es[key] || key;
}

// =============================================================================
// Soporte de Tema Claro / Oscuro (Light Mode / Dark Mode)
// =============================================================================
export type ThemeMode = 'dark' | 'light';

let currentTheme: ThemeMode = (
  (typeof localStorage !== 'undefined' && localStorage.getItem('guacamolegh_flags_theme') as ThemeMode) || 'dark'
);

const themeListeners = new Set<(theme: ThemeMode) => void>();

export function getTheme(): ThemeMode {
  return currentTheme;
}

export function setTheme(theme: ThemeMode): void {
  currentTheme = theme;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('guacamolegh_flags_theme', theme);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
  themeListeners.forEach(fn => fn(theme));
}

export function toggleTheme(): void {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

export function onThemeChange(fn: (theme: ThemeMode) => void): () => void {
  themeListeners.add(fn);
  return () => themeListeners.delete(fn);
}

// Aplicar tema inicial al cargar el script
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', currentTheme);
}
