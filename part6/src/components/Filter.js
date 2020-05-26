import React from 'react';
import Button from './VoteButton';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, removeFilter } from '../reducers/filterReducer';

const DisplayFIlter = () => {
  const filterefAne = useSelector(({ anecdotes, filter }) => {
    if (filter === null) {
      return [];
    }
    return anecdotes.filter((ane) =>
      ane.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div>
      {filterefAne.map((ane) => (
        <div key={ane.id}>
          {ane.content} has {ane.votes} votes
          <Button ane={ane} />
        </div>
      ))}
    </div>
  );
};

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = ({ target }) => {
    const value = target.value;

    if (!value.length) {
      return dispatch(removeFilter());
    }
    dispatch(setFilter(value));
  };

  return (
    <div>
      Filter <input onChange={handleFilter} />
      <DisplayFIlter />
    </div>
  );
};

export default Filter;
