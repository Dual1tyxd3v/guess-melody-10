import Welcome from '../../pages/welcome/welcome';
import { Routes, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import GameOver from '../../pages/gameOver/gameOver';
import WinScreen from '../../pages/winScreen/winScreen';
import NotFound from '../../pages/notFound/notFound';
import {AppRoute, MAX_MISTAKE_COUNT} from '../../const';
import PrivateRoute from '../../components/privateRoute/privateRoute';
import GameScreen from '../../pages/game-screen/game-screen';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loadingScreen/loadingScreen';
import { isCheckedAuth } from '../../game';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/userProcess/selectors';
import { getLoadedDataStatus } from '../../store/gameData/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoading = useAppSelector(getLoadedDataStatus);

  if (isCheckedAuth(authorizationStatus) || isDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<Welcome errorsCount={MAX_MISTAKE_COUNT}/>} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Result} element={
          <PrivateRoute authStatus={authorizationStatus}>
            <WinScreen />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Lose} element={<GameOver />} />
        <Route path={AppRoute.Game} element={<GameScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}
export default App;
