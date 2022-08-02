import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { Questions } from './question';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type GameData = {
  questions: Questions;
  isDataLoading: boolean;
}

export type GameProcessType = {
  mistakes: number;
  step: number;
}
