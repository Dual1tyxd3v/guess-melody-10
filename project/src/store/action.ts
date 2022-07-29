import { createAction } from '@reduxjs/toolkit';
import { Question, UserAnswer, Questions } from '../types/question';
import { AuthorizationStatus, AppRoute } from '../const';
// создание экшенов увеличение шага
export const incrementStep = createAction('game/incrementStep');
// сброс игры
export const resetGame = createAction('game/resetGame');
// проверка ответов
export const checkUserAnswer = createAction<{question: Question, answer: UserAnswer}>('game/checkUserAnswer');

export const loadQuestions = createAction<Questions>('data/loadQuestions');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('game/setError');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
