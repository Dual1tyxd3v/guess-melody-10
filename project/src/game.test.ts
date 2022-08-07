import { isAnswerArtistCorrect, isAnswerGenreCorrect } from './game';
import { makeFakeArtistQuestion, makeFakeGenreQuestion } from './utils/mocks';

const mockArtistQuestion = makeFakeArtistQuestion();
const mockGenreQuestion = makeFakeGenreQuestion();

describe('Business Logic: check user\'s answer', () => {
  describe('Function: isArtistAnswerCorrect', () => {
    it('should return "true" when answer is correct', () => {
      const {artist: correctAnswer} = mockArtistQuestion.song;
      expect(isAnswerArtistCorrect(mockArtistQuestion, correctAnswer))
        .toBe(true);
    });

    it('should return "false" when answer is incorrect', () => {
      const incorrectAnswer = 'unknown';
      expect(isAnswerArtistCorrect(mockArtistQuestion, incorrectAnswer))
        .toBe(false);
    });
  });

  describe('Function is isAnswerGenreCorrect', () => {
    it('should return "true" when answer is correct', () => {
      const {answers} = mockGenreQuestion;
      const correctAnswers = answers.map((answer) => answer.genre === mockGenreQuestion.genre);
      expect(isAnswerGenreCorrect(mockGenreQuestion, correctAnswers)).toBe(true);
    });

    it('should return "false" when answer is incorrect', () => {
      const {answers} = mockGenreQuestion;
      const incorrectAnswers = answers.map((answer) => answer.genre !== mockGenreQuestion.genre);
      expect(isAnswerGenreCorrect(mockGenreQuestion, incorrectAnswers)).toBe(false);
    });
  });
});

