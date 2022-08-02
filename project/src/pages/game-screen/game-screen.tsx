import { useAppSelector, useAppDispatch } from '../../hooks/';
import { Navigate } from 'react-router-dom';
import { incrementStep, checkUserAnswer } from '../../store/gameProcess/gameProcess';
import { AppRoute, GameType, MAX_MISTAKE_COUNT} from '../../const';
import ArtistQuestions from '../artistQuestions/artistQuestions';
import GenreQuestions from '../genreQuestions/genreQuestions';
import withAudioPlayer from '../../hocs/withAudioPlayer/withAudioPlayer';
import { QuestionArtist, QuestionGenre, Question, UserAnswer } from '../../types/question';
import Mistakes from '../../components/mistakes/mistakes';
import { getMistakes, getStep } from '../../store/gameProcess/selectors';
import { getQuestions } from '../../store/gameData/selectors';

const ArtistQuestionsWrapped = withAudioPlayer(ArtistQuestions);
const GenreQuestionsWrapped = withAudioPlayer(GenreQuestions);

function GameScreen(): JSX.Element {
  const step = useAppSelector(getStep);
  const questions = useAppSelector(getQuestions);
  const mistakes = useAppSelector(getMistakes);

  // получаем данные с вопросом по индексу шага (по сути просто идекс массива вопросов)
  const question = questions[step];

  const dispatch = useAppDispatch();
  // если вопросов больше нет переходим на главную страницу
  if (step >= questions.length || !questions) {
    return <Navigate to={AppRoute.Result} />;
  }

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return <Navigate to={AppRoute.Lose} />;
  }
  const onUserAnswer = (questionItem: Question, answer: UserAnswer) => {
    dispatch(incrementStep());
    dispatch(checkUserAnswer({question: questionItem, answer}));
  };

  // перебираем тип вопроса и выдаем определенный компонент
  switch (question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionsWrapped
          key={step} //уникальный идентификатор
          question={question as QuestionArtist}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionsWrapped>
      );
    case GameType.Genre:
      return (
        <GenreQuestionsWrapped
          key={step}
          question={question as QuestionGenre}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionsWrapped>
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export default GameScreen;
