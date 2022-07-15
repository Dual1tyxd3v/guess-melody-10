import Welcome from '../../pages/welcome/welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import GameOver from '../../pages/gameOver/gameOver';
import WinScreen from '../../pages/winScreen/winScreen';
import NotFound from '../../pages/notFound/notFound';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../components/privateRoute/privateRoute';
import {Questions} from '../../types/question';
import GameScreen from '../../pages/game-screen/game-screen';

type AppProps = {
  errorsCount: number;
  questions: Questions;
}

function App({errorsCount, questions} : AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Welcome errorsCount={errorsCount}/>} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Result} element={
          <PrivateRoute authStatus={AuthorizationStatus.NoAuth}>
            <WinScreen />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Lose} element={<GameOver />} />
        <Route path={AppRoute.Game} element={<GameScreen questions={questions}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
