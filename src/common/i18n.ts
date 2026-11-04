// =============================================================================
// GuacamoleGH Flags — Country Flag Quiz
// Copyright (c) 2026 GuacamoleGH
// Licensed under the MIT License. See LICENSE for details.
// Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
// =============================================================================

/**
 * @fileoverview Sistema reactivo y tipado de internacionalización (Español / English).
 * @spec REQ-06
 */

import type { SupportedLanguage } from './types/country';

export const TRANSLATIONS = {
  es: {
    appTitle: 'GuacamoleGH Flags',
    appSubtitle: 'Quiz de banderas de los 196 países oficiales del mundo',
    navQuiz: 'Quiz',
    navLeaderboard: 'Rankings',
    navHistory: 'Historial',
    navProfile: 'Perfil',
    navLogin: 'Iniciar sesión',
    navRegister: 'Registrarse',
    navLogout: 'Cerrar sesión',
    guestUser: 'Invitado',

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
    quizInstruction: 'Identifica las 196 banderas escribiendo el nombre de cada país. Pulsa Enter o escribe el nombre completo.',
    placeholderAnswer: 'Escribe el país...',
    placeholderSearch: 'Filtrar por continente o nombre...',
    compoundHint: 'Reconocido por abreviación compuesta',

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
    leaderboardSubtitle: 'Los mejores tiempos completando los 196 países oficiales',
    colRank: 'Posición',
    colPlayer: 'Jugador',
    colTime: 'Tiempo',
    colDate: 'Fecha',
    yourRankBanner: 'Tu posición actual en el ranking:',
    noRecords: 'Aún no hay récords registrados. ¡Completa las 196 banderas para liderar el ranking!',

    // Perfil
    profileTitle: 'Perfil de Jugador',
    lblMemberSince: 'Miembro desde',
    lblBestTime: 'Mejor tiempo (196)',
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
    authSuccessRegister: '¡Cuenta creada con éxito!',

    // Continentes para filtros
    continentAll: 'Todos los continentes',
    continentEurope: 'Europa',
    continentAsia: 'Asia',
    continentAfrica: 'África',
    continentAmericas: 'América',
    continentOceania: 'Oceanía'
  },
  en: {
    appTitle: 'GuacamoleGH Flags',
    appSubtitle: 'Country Flag Quiz featuring all 196 official world countries',
    navQuiz: 'Quiz',
    navLeaderboard: 'Leaderboard',
    navHistory: 'History',
    navProfile: 'Profile',
    navLogin: 'Log in',
    navRegister: 'Register',
    navLogout: 'Log out',
    guestUser: 'Guest',

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
    quizInstruction: 'Identify all 196 flags by typing each country name. Press Enter or type the complete name.',
    placeholderAnswer: 'Type country...',
    placeholderSearch: 'Filter by continent or name...',
    compoundHint: 'Recognized by compound shortcut',

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
    leaderboardSubtitle: 'Fastest times identifying all 196 official countries',
    colRank: 'Rank',
    colPlayer: 'Player',
    colTime: 'Time',
    colDate: 'Date',
    yourRankBanner: 'Your current position on the leaderboard:',
    noRecords: 'No records yet. Complete all 196 flags to take the lead!',

    // Profile
    profileTitle: 'Player Profile',
    lblMemberSince: 'Member since',
    lblBestTime: 'Best Time (196)',
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
    authSuccessRegister: 'Account created successfully!',

    // Continents
    continentAll: 'All Continents',
    continentEurope: 'Europe',
    continentAsia: 'Asia',
    continentAfrica: 'Africa',
    continentAmericas: 'Americas',
    continentOceania: 'Oceania'
  }
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS['es'];

let currentLang: SupportedLanguage = (
  (typeof localStorage !== 'undefined' && localStorage.getItem('guacamolegh_flags_lang') as SupportedLanguage) || 'es'
);

const listeners = new Set<(lang: SupportedLanguage) => void>();

export function getLanguage(): SupportedLanguage {
  return currentLang;
}

export function setLanguage(lang: SupportedLanguage): void {
  if (lang !== 'es' && lang !== 'en') return;
  currentLang = lang;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('guacamolegh_flags_lang', lang);
  }
  listeners.forEach(fn => fn(lang));
}

export function onLanguageChange(fn: (lang: SupportedLanguage) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function t(key: TranslationKey): string {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS.es[key] || key;
}
