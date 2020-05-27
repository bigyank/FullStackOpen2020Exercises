import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createNew = async (data) => {
  const object = { content: data, votes: 0 };
  const response = await axios.post(baseURL, object);
  return response.data;
};

const updateVote = async (ane) => {
  const id = ane.id;
  const changedAnecdote = {
    ...ane,
    votes: ane.votes + 1,
  };
  axios.put(baseURL.concat(`/${id}`), changedAnecdote);
  return changedAnecdote;
};

export default { getAll, createNew, updateVote };
