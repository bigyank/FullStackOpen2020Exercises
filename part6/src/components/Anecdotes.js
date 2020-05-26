import React from 'react';
import Button from './VoteButton';
import { useSelector } from 'react-redux';

const Anecdotes = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  );

  return (
    <div>
      {anecdotes.map((ane) => {
        return (
          <div key={ane.id}>
            {ane.content}
            <div>
              has {ane.votes} votes <Button ane={ane} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Anecdotes;
