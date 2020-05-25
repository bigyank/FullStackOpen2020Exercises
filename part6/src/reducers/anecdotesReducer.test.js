import deepFreeze from 'deep-freeze';
import anecdotesReducer from './anecdotesReducer';

let initialState;
let finalAnecdote;

describe('anecdotesReducer', () => {
  beforeEach(() => {
    const anecdotesAtStart = [
      'If it hurts, do it more often',
      'Adding manpower to a late software project makes it later!',
    ];

    const getId = () => (100000 * Math.random()).toFixed(0);

    const asObject = (anecdote) => {
      return {
        content: anecdote,
        id: getId(),
        votes: 0,
      };
    };

    initialState = anecdotesAtStart.map(asObject);
  });

  test('new anecdote can be added', () => {
    const state = initialState;
    const action = { type: 'ADD_NEW', data: 'Hello' };
    deepFreeze(state);
    const finalAnecdotes = anecdotesReducer(state, action);

    expect(finalAnecdotes).toHaveLength(initialState.length + 1);
  });

  describe('ancedote can be voted', () => {
    beforeEach(() => {
      const state = initialState;
      const action = { type: 'ADD_NEW', data: 'Hello' };
      deepFreeze(state);
      finalAnecdote = anecdotesReducer(state, action);
    });

    test('anecdote can be voted', () => {
      const toVote = finalAnecdote.find(
        (anecdote) => anecdote.content === 'Hello'
      );

      const votedAnecs = anecdotesReducer(finalAnecdote, {
        type: 'VOTE',
        data: toVote.id,
      });

      const singleAnec = votedAnecs.find((anec) => anec.id === toVote.id);

      expect(singleAnec.votes).toBe(toVote.votes + 1);
    });
  });
});
