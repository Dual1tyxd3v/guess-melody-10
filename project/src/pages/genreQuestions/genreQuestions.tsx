import { FormEvent, PropsWithChildren } from 'react';
import GenreQuestionItem from '../../components/genreQuestionItem/genreQuestionItem';
import Logo from '../../components/logo/logo';
import { useUserAnswers } from '../../hooks/use-user-answers';
import { QuestionGenre, UserGenreQuestionAnswer } from '../../types/question';

type GenreQuestionsProps = PropsWithChildren<{
  question: QuestionGenre;
  onAnswer: (question: QuestionGenre, answers: UserGenreQuestionAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>

function GenreQuestions(props: GenreQuestionsProps): JSX.Element {
  const {question, onAnswer, renderPlayer, children} = props;
  const {answers, genre} = question;
  // устанавливаем состояние с массивом ответов
  const [userAnswers, handleAnswersChange] = useUserAnswers(question);

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
        <form className="game__tracks"
          onSubmit={(evt: FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            onAnswer(question, userAnswers);
          }}
        >
          {
            answers.map((answer, id) => {
              const keyValue = `genreItem_${id}`;
              return <GenreQuestionItem key={keyValue} userAnswer={userAnswers[id]} renderPlayer={renderPlayer} id={id} answer={answer} onChange={handleAnswersChange} />;
            }
            // создаем уникальный ID по номеру итератора + ссылки
            )
          }
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
}
export default GenreQuestions;
