import { FormEvent } from 'react';
import { useUserAnswers } from '../../hooks/use-user-answers';
import { QuestionGenre, UserGenreQuestionAnswer } from '../../types/question';
import GenreQuestionItem from '../genreQuestionItem/genreQuestionItem';

type GenreQuestionListProps = {
  onAnswer: (question: QuestionGenre, userAnswers: UserGenreQuestionAnswer) => void;
  question: QuestionGenre;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}

function GenreQuestionList({onAnswer, question, renderPlayer}: GenreQuestionListProps): JSX.Element {
  const {answers} = question;
  const [userAnswers, handleAnswersChange] = useUserAnswers(question);

  return (
    <form className="game__tracks"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onAnswer(question, userAnswers);
      }}
    >
      {
        answers.map((answer, id) => {
          const keyValue = `${answer}_${id}`;
          return <GenreQuestionItem key={keyValue} userAnswer={userAnswers[id]} renderPlayer={renderPlayer} id={id} answer={answer} onChange={handleAnswersChange} />;
        }
          // создаем уникальный ID по номеру итератора + ссылки
        )
      }
      <button className="game__submit button" type="submit">Ответить</button>
    </form>
  );
}

export default GenreQuestionList;
