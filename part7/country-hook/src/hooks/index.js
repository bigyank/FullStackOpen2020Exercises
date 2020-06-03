import { useEffect, useState } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name.length === 0) {
      return setCountry(null);
    }

    const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;
    const findCountry = async () => {
      try {
        const response = await axios.get(url);
        setCountry({ data: response.data[0], found: true });
      } catch (e) {
        setCountry({ found: false });
      }
    };

    findCountry();
  }, [name]);

  return country;
};
