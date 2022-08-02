import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { resetGame } from '../../store/gameProcess/gameProcess';
import { AppRoute } from '../../const';

function GameOver(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tryAgain = () => {
    dispatch(resetGame());
    navigate(AppRoute.Game);
  };

  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Какая жалость!</h2>
      <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
      <button className="replay" type="button" onClick={tryAgain}>Попробовать ещё раз</button>
    </section>
  );
}
export default GameOver;
