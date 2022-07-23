import { reducer } from './reducer';
import { configureStore } from '@reduxjs/toolkit';
// инициализируем store передав редюсер
export const store = configureStore({reducer});
