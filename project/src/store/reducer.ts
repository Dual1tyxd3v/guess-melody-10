import { createReducer } from '@reduxjs/toolkit';
import { setError } from './action';

type InitialState = {
  error: string | null,
};
// начальное состояние стора
const initialState: InitialState = {
  error: null,
};
// создаем редюсер и прикручиваем к нему наши action
const reducer = createReducer(initialState, (builder) => {
  builder
    // по скольку используются аргументы мы используем payload action
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
