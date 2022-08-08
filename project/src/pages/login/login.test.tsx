import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import userEvent from '@testing-library/user-event';
import Login from './login';

const mockStore = configureMockStore();

describe('Component: Login', () => {
  it('should render "Login Screen" when user navigate to "login" url', async () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
    expect(screen.getByText(/Хотите узнать свой результат\? Представтесь!/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('login'), 'keks');
    await userEvent.type(screen.getByTestId('password'), '12345');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/12345/i)).toBeInTheDocument();
  });
});
