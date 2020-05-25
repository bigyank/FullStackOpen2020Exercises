import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdotesReducer';

const Form = () => {
  const dispatch = useDispatch();

  const handleForm = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addAnecdote(content));
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        Add Anecdote <input name='anecdote' />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default Form;
