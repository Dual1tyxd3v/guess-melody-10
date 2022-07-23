import { Question, QuestionArtist, QuestionGenre, UserAnswer, UserArtisQuestionAnswer, UserGenreQuestionAnswer } from './types/question';
import { GameType } from './const';

export const isAnswerCorrect = (question: Question, answer: UserAnswer): boolean => {
  if (question.type === GameType.Artist && typeof answer === 'string') {
    return isAnswerArtistCorrect(question, answer);
  }

  if (question.type === GameType.Genre && Array.isArray(answer)) {
    return isAnswerGenreCorrect(question, answer);
  }

  return false;
};

export const isAnswerArtistCorrect = (question: QuestionArtist, answer: UserArtisQuestionAnswer): boolean =>
  answer === question.song.artist;

export const isAnswerGenreCorrect = (question: QuestionGenre, answer: UserGenreQuestionAnswer): boolean =>
  answer.every((answerItem, i) =>
    answerItem === (question.answers[i].genre === question.genre) );
