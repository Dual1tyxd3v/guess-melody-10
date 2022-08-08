import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction } from '../api-actions';
import { userProcess } from './userProcess';

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {authorizationStatus: AuthorizationStatus.Unknown};
  });

  it('return initial state without additional parameteres', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  describe('chechAuthAction test', () => {
    it('should update authStatus to "AUTH" if checkAuthorization fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth});
    });

    it('should update authStatus to "NO_AUTH" if chekAuthorization rejected', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('loginAction test', () => {
    it('should update authStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth});
    });

    it('should update authStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });
});
