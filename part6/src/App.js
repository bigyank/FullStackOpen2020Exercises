import React from 'react';
import Form from './components/Form';
import Anecdotes from './components/Anecdotes';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Form />
      <Anecdotes />
    </div>
  );
};

export default App;
