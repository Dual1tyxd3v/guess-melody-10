import Welcome from '../../pages/welcome/welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App(): JSX.Element {
  const {authorizationStatus, isDataLoading} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || isDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
export default App;
