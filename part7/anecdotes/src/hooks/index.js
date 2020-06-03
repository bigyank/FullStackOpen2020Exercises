import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useFeild = (type) => {
  const [value, setValue] = useState('');

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  const clear = () => {
    setValue('');
  };

  return {
    type,
    onChange,
    clear,
    value,
  };
};
