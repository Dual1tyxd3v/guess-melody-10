import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {resetGame} from '../../store/gameProcess/gameProcess';


type WelcomeProps = {
  errorsCount: number;
}

function Welcome({errorsCount} : WelcomeProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return(
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      {/* с помощью хука клик по кнопке переносит нас на другую страницу */}
      <button className="welcome__button"
        onClick={() => {
          dispatch(resetGame());
          navigate(AppRoute.Game);
        }}
      ><span className="visually-hidden" >Начать игру</span>
      </button>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {errorsCount} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
}
export default Welcome;
