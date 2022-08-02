import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetGame } from '../../store/gameProcess/gameProcess';
import { logoutAction } from '../../store/api-actions';
import { getMistakes, getStep } from '../../store/gameProcess/selectors';

function WinScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mistakes = useAppSelector(getMistakes);
  const step = useAppSelector(getStep);
  const correctAnswers = step - mistakes;

  return (
    <section className="result">
      <div className="result-logout__wrapper">
        <Link className="result-logout__link" to="/"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logoutAction());
          }}
        >
          Выход
        </Link>
      </div>
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctAnswers} вопросов и совершили {mistakes} ошибки</p>
      <button className="replay" type="button"
        onClick={() => {
          dispatch(resetGame());
          navigate(AppRoute.Game);
        }}
      >
        Сыграть ещё раз
      </button>
    </section>
  );
}
export default WinScreen;
