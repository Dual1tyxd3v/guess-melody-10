import { createReducer } from '@reduxjs/toolkit';
import { FIRST_GAME_STEP, AuthorizationStatus } from '../const';
import { incrementStep, resetGame, checkUserAnswer, loadQuestions, requireAuthorization, setError } from './action';
import { isAnswerCorrect } from '../game';
import { Questions } from '../types/question';
// значение шага
const STEP_COUNT = 1;

type InitialState = {
  mistakes: number,
  step: number,
  question: Questions,
  authorizationStatus: AuthorizationStatus,
  error: string | null,
};
// начальное состояние стора
const initialState: InitialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  questions: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};
// создаем редюсер и прикручиваем к нему наши action
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementStep, (state) => {
      state.step = state.step + STEP_COUNT;
    })
    .addCase(resetGame, (state) => {
      state.step = FIRST_GAME_STEP;
      state.mistakes = 0;
    })
    // по скольку используются аргументы мы используем payload action
    .addCase(checkUserAnswer, (state, action) => {
      const {question, answer} = action.payload;
      // получаем булево значение, инвертируем его и увеличиваем свойство стейта на ответ привиденный к числу
      state.mistakes += Number(!isAnswerCorrect(question, answer));
    }).addCase(loadQuestions, (state, action) => {
      state.questions = action.payload;
    }).addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    }).addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
