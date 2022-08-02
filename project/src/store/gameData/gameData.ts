import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GameData } from '../../types/state';
import { fetchQuestionAction } from '../api-actions';

const initialState: GameData = {
  questions: [],
  isDataLoading: false,
};

export const gameData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestionAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchQuestionAction.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchQuestionAction.rejected, (state) => {
        state.isDataLoading = false;
      });
  }
});
