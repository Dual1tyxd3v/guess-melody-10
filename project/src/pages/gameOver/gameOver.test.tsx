import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import GameOver from './gameOver';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore();

describe('Component GameOver', () => {
  beforeEach(() => {
    history.push(AppRoute.Lose);
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GameOver />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Какая жалость!/i)).toBeInTheDocument();
    expect(screen.getByText(/У вас закончились все попытки./i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
  });

  it('should redirect when user click "Replay Button"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Lose} element={<GameOver />}/>
            <Route path={AppRoute.Game} element={<h1>mock game screen</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Попробовать ещё раз/i));

    expect(screen.getByText(/mock game screen/i)).toBeInTheDocument();
  });
});
