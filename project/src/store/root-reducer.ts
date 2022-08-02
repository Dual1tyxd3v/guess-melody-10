import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { gameData } from './gameData/gameData';
import { gameProcess } from './gameProcess/gameProcess';
import { userProcess } from './userProcess/userProcess';

export const rootReducer = combineReducers({
  [NameSpace.Data]: gameData.reducer,
  [NameSpace.Game]: gameProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
