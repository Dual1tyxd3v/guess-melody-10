import Welcome from '../../pages/welcome/welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import GameOver from '../../pages/gameOver/gameOver';
import ArtistQuestions from '../../pages/artistQuestions/artistQuestions';
import GenreQuestions from '../../pages/genreQuestions/genreQuestions';
import WinScreen from '../../pages/winScreen/winScreen';
import NotFound from '../../pages/notFound/notFound';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../components/privateRoute/privateRoute';

type AppProps = {
  errorsCount: number;
}

function App({errorsCount} : AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Welcome errorsCount={errorsCount}/>} />
        <Route path={AppRoute.DevArtist} element={<ArtistQuestions />} />
        <Route path={AppRoute.DevGenre} element={<GenreQuestions />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Result} element={
          <PrivateRoute authStatus={AuthorizationStatus.NoAuth}>
            <WinScreen />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Lose} element={<GameOver />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
