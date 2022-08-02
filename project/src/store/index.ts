import { reducer } from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';

const api = createAPI();
// инициализируем store передав редюсер
export const store = configureStore({
  // временно удаляем reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect),
});
