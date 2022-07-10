import Welcome from '../../pages/welcome/welcome';
/* import Login from '../../pages/login/login';
import GameOver from '../../pages/gameOver/gameOver'; */
/* import ArtistQuestions from '../../pages/artistQuestions/artistQuestions';
import GenreQuestions from '../../pages/genreQuestions/genreQuestions';
import WinScreen from '../../pages/winScreen/winScreen'; */
/* import NotFound from '../../pages/notFound/notFound'; */

type AppProps = {
  errorsCount: number;
}

function App({errorsCount} : AppProps): JSX.Element {
  return (
    <>
      <Welcome errorsCount={errorsCount} />
      {/* <Login />
      <GameOver /> */}
      {/* <ArtistQuestions /> */}
      {/* <GenreQuestions /> */}
      {/* <WinScreen /> */}
      {/* <NotFound /> */}
    </>
  );
}

export default App;
