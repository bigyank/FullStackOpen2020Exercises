import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW':
      const toAdd = action.data;
      return [...state, toAdd];

    case 'VOTE':
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id === id ? action.data : anecdote
      );

    case 'INIT':
      return action.data;

    default:
      return state;
  }
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'ADD_NEW',
      data: anecdote,
    });
  };
};

export const voteAnecdote = (ane) => {
  return async (dispatch) => {
    const updatedAne = await anecdoteService.updateVote(ane);
    dispatch({
      type: 'VOTE',
      data: updatedAne,
    });
  };
};

export const initAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes,
    });
  };
};

export default reducer;
