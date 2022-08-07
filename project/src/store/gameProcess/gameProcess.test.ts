import { makeFakeArtistQuestion, makeFakeGenreQuestion } from '../../utils/mocks';
import { checkUserAnswer, gameProcess, incrementStep, resetGame } from './gameProcess';

const mockFakeGenreQuestion = makeFakeGenreQuestion();
const mockArtistQuestion = makeFakeArtistQuestion();

describe('Reducer: gameProcess', () => {
  it('without additional parameteres return initial state', () => {
    expect(gameProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({step: 0, mistakes: 0});
  });

  it('should increment current step by a given value', () => {
    const state = {step: 0, mistakes: 0};
    expect(gameProcess.reducer(state, incrementStep()))
      .toEqual({step: 1, mistakes: 0});
  });

  it('should increment mistakes with the wrong answer', () => {
    const state = {step: 0, mistakes: 0};
    const wrongArtistQuestionAnswer = 'unknown';
    const wrongGenreQUestionAnswer = mockFakeGenreQuestion.answers.map((answer) => answer.genre !== mockFakeGenreQuestion.genre);

    expect(gameProcess.reducer(state, checkUserAnswer({question: mockFakeGenreQuestion, answer: wrongGenreQUestionAnswer})))
      .toEqual({step: 0, mistakes: 1});

    expect(gameProcess.reducer(state, checkUserAnswer({question: mockArtistQuestion, answer: wrongArtistQuestionAnswer})))
      .toEqual({step: 0, mistakes: 1});
  });

  it('should not increase mistakes with correct answers', () => {
    const state = {step: 0, mistakes: 0};
    const {artist: correctArtistQuestionAnswer} = mockArtistQuestion.song;
    const correctGenreQuestionAnswer = mockFakeGenreQuestion.answers.map((answer) => answer.genre === mockFakeGenreQuestion.genre);

    expect(gameProcess.reducer(state, checkUserAnswer({question: mockArtistQuestion, answer: correctArtistQuestionAnswer})))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess.reducer(state, checkUserAnswer({question: mockFakeGenreQuestion, answer: correctGenreQuestionAnswer})))
      .toEqual({step: 0, mistakes: 0});
  });

  it('should have reset game', () => {
    expect(gameProcess.reducer({step: 14, mistakes: 2}, resetGame()))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess.reducer({step: 0, mistakes: 0}, resetGame()))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess.reducer({step: 0, mistakes: 2}, resetGame()))
      .toEqual({step: 0, mistakes: 0});
  });
});
