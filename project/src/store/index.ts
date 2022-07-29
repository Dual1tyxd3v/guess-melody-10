import { reducer } from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';

const api = createAPI();
// инициализируем store передав редюсер
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
});
