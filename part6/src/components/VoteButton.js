import React from 'react';
import { useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdotesReducer';
import { setNotification } from '../reducers/notificationReducer';

const Button = ({ ane }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(voteAnecdote(ane));
    dispatch(setNotification(`You voted ${ane.content}`, 5));
  };

  return <button onClick={handleClick}>Vote</button>;
};

export default Button;
