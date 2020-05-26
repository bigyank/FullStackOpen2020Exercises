import React from 'react';
import Form from './components/Form';
import Anecdotes from './components/Anecdotes';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
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
