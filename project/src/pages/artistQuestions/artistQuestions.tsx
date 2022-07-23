/* eslint-disable jsx-a11y/anchor-is-valid */
import Logo from '../../components/logo/logo';
import { ChangeEvent, PropsWithChildren } from 'react';
import { UserArtisQuestionAnswer, QuestionArtist } from '../../types/question';

type ArtistQuestionsProps = PropsWithChildren<{
  question: QuestionArtist;
  onAnswer: (question: QuestionArtist, answer: UserArtisQuestionAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>

function ArtistQuestions(props: ArtistQuestionsProps): JSX.Element {
  // получаем вопрос из пропсов
  const {question, onAnswer, renderPlayer, children} = props;
  const {answers, song} = question;

  return (
    <section className="game game--artist">
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
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            {
              renderPlayer(song.src, 0)
            }
          </div>
        </div>

        <form className="game__artist">
          {/* по массиву с возможными ответами генерируем разметку */}
          {answers.map((answer, id) => (
            <div key={answer.artist} className="artist">
              {/* по клику на элемент с ответом передаем ответ */}
              <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${id}`} id={`answer-${id}`} onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                evt.preventDefault();
                onAnswer(question, answer.artist);
              }}
              />
              <label className="artist__name" htmlFor={`answer-${id}`}>
                <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                {answer.artist}
              </label>
            </div>
          ))}

        </form>
      </section>
    </section>
  );
}
export default ArtistQuestions;
