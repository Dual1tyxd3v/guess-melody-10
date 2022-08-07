import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { checkAuthAction, fetchQuestionAction, loginAction, logoutAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { makeFakeArtistQuestion, makeFakeGenreQuestion } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State, Action, ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should auth status is "auth" when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch requiredAuthorization and redirectToRoute when post /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI.onPost(APIRoute.Login).reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('guess_melody_token', 'secret');
  });

  it('should dispatch Load_Questions when GET /questions', async () => {
    const mockQuestions = [makeFakeArtistQuestion(), makeFakeGenreQuestion()];
    mockAPI.onGet(APIRoute.Questions).reply(200, mockQuestions);

    const store = mockStore();

    await store.dispatch(fetchQuestionAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchQuestionAction.pending.type,
      fetchQuestionAction.fulfilled.type
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('guess_melody_token');
  });
});
