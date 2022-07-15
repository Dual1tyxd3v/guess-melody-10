import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, GameType, FIRST_GAME_STEP } from '../../const';
import ArtistQuestions from '../artistQuestions/artistQuestions';
import GenreQuestions from '../genreQuestions/genreQuestions';
import { QuestionArtist, QuestionGenre, Questions } from '../../types/question';

type GameScreenProps = {
  questions: Questions;
}

function GameScreen({questions}: GameScreenProps): JSX.Element {
  // устанавливаем состояние по начальному шагу игры
  const [step, setStep] = useState(FIRST_GAME_STEP);

  // получаем данные с вопросом по индексу шага (по сути просто идекс массива вопросов)
  const question = questions[step];

  // если вопросов больше нет переходим на главную страницу
  if (step >= questions.length || !questions) {
    return <Navigate to={AppRoute.Root} />;
  }

  // перебираем тип вопроса и выдаем определенный компонент
  switch (question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestions
          key={step} //уникальный идентификатор
          question={question as QuestionArtist}
          onAnswer={() => setStep((prev) => prev + 1)}
        />
      );
    case GameType.Genre:
      return (
        <GenreQuestions
          key={step}
          question={question as QuestionGenre}
          onAnswer={() => setStep((prev) => prev + 1)}
        />
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export default GameScreen;
