import React from 'react';
import { useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdotesReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const Button = ({ ane }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(voteAnecdote(ane.id));
    dispatch(setNotification(`You voted ${ane.content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return <button onClick={handleClick}>Vote</button>;
};

export default Button;
