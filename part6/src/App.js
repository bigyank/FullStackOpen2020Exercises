import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { initAnecdote } from './reducers/anecdotesReducer';

import Form from './components/Form';
import Anecdotes from './components/Anecdotes';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdote());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <Filter />
      <Form />
      <Anecdotes />
    </div>
  );
};

export default App;
