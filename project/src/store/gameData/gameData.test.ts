import { makeFakeArtistQuestion, makeFakeGenreQuestion } from '../../utils/mocks';
import { fetchQuestionAction } from '../api-actions';
import { gameData } from './gameData';

const questions = [makeFakeArtistQuestion, makeFakeGenreQuestion];

describe('Reducer : gameData', () => {
  it('should return initial state without additional parameteres', () => {
    expect(gameData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({questions: [], isDataLoading: false});
  });

  it('should update questions by load questions', () => {
    const state = {questions: [], isDataLoading: false};

    expect(gameData.reducer(state, {type: fetchQuestionAction.fulfilled.type, payload: questions}))
      .toEqual({questions, isDataLoading: false});
  });
});
