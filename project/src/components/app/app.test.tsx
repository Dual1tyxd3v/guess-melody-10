import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, MAX_MISTAKE_COUNT } from '../../const';
import HistoryRouter from '../history-route/history-route';
import App from './app';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {isDataLoading: false},
  GAME: {step: 10, mistakes: 2}
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Начать игру/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Можно допустить ${MAX_MISTAKE_COUNT}`))).toBeInTheDocument();
  });

  it('should "AuthScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByText(/Хотите узнать свой результат\? Представтесь!/i)).toBeInTheDocument();
    expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
  });

  it('should "WinScreen" when user navigate to "/result"', () => {
    history.push(AppRoute.Result);

    render(fakeApp);

    expect(screen.getByText(/Вы настоящий меломан!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вы ответили правильно на 8 вопросов/i)).toBeInTheDocument();
    expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
  });

  it('should "GameOverScreen" when user navigate to "/lose"', () => {
    history.push(AppRoute.Lose);

    render(fakeApp);

    expect(screen.getByText(/Какая жалость!/i)).toBeInTheDocument();
    expect(screen.getByText(/У вас закончились все попытки. Ничего, повезёт в следующий раз!/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
  });

  it('should "NotFoundScreen" when user navigate to non-existance route', () => {
    history.push('/non-existance-route/');

    render(fakeApp);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
