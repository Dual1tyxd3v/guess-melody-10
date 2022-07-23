import { createAction } from '@reduxjs/toolkit';
import { Question, UserAnswer } from '../types/question';
// создание экшенов увеличение шага
export const incrementStep = createAction('game/incrementStep');
// сброс игры
export const resetGame = createAction('game/resetGame');
// проверка ответов
export const checkUserAnswer = createAction<{question: Question, answer: UserAnswer}>('game/checkUserAnswer');
