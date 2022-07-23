import Welcome from '../../pages/welcome/welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import GameOver from '../../pages/gameOver/gameOver';
import WinScreen from '../../pages/winScreen/winScreen';
import NotFound from '../../pages/notFound/notFound';
import {AppRoute, AuthorizationStatus, MAX_MISTAKE_COUNT} from '../../const';
import PrivateRoute from '../../components/privateRoute/privateRoute';
import GameScreen from '../../pages/game-screen/game-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Welcome errorsCount={MAX_MISTAKE_COUNT}/>} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Result} element={
          <PrivateRoute authStatus={AuthorizationStatus.NoAuth}>
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
