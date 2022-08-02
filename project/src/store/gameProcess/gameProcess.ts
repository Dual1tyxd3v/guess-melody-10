import { createSlice } from '@reduxjs/toolkit';
import { FIRST_GAME_STEP, NameSpace } from '../../const';
import { isAnswerCorrect } from '../../game';
import { GameProcessType } from '../../types/state';

const STEP_COUNT = 1;

const initialState: GameProcessType = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
};

export const gameProcess = createSlice({
  name: NameSpace.Game,
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.step = state.step + STEP_COUNT;
    },
    resetGame: (state) => {
      state.step = FIRST_GAME_STEP;
      state.mistakes = 0;
    },
    checkUserAnswer: (state, action) => {
      const {question, answer} = action.payload;
      // получаем булево значение, инвертируем его и увеличиваем свойство стейта на ответ привиденный к числу
      state.mistakes += Number(!isAnswerCorrect(question, answer));
    }
  },
});
