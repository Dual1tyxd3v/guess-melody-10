import { PropsWithChildren } from 'react';
import GenreQuestionList from '../../components/genreQuestionList/genreQuestionList';
import Logo from '../../components/logo/logo';
import { QuestionGenre, UserGenreQuestionAnswer } from '../../types/question';

type GenreQuestionsProps = PropsWithChildren<{
  question: QuestionGenre;
  onAnswer: (question: QuestionGenre, answers: UserGenreQuestionAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>

function GenreQuestions(props: GenreQuestionsProps): JSX.Element {
  const {question, onAnswer, renderPlayer, children} = props;
  const {genre} = question;

  return (
    <section className="game game--genre">
      <header className="game__header">
        <Logo />

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>

        {children}

      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <GenreQuestionList onAnswer={onAnswer} question={question} renderPlayer={renderPlayer} />
      </section>
    </section>
  );
}
export default GenreQuestions;
