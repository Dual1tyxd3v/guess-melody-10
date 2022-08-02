import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const setError = createAction<string | null>('game/setError');

export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
