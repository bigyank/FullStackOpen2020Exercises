import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdotesReducer';

const Button = ({ id }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(voteAnecdote(id));
  };

  return <button onClick={handleClick}>Vote</button>;
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );

  return (
    <div>
      {anecdotes.map((ane) => {
        return (
          <div key={ane.id}>
            {ane.content}
            <div>
              has {ane.votes} votes <Button id={ane.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Anecdotes;
