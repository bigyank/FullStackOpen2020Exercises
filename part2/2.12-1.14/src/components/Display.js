import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplaySingle = ({ countryData, matched }) => {
  const data = countryData.find((country) => country.name === matched);
  return (
    <div>
      <h1>{data.name}</h1>
      <p>Capital: {data.capital}</p>
      <p>Population: {data.population}</p>
      <h2>Languages</h2>
      <ul>
        {data.languages.map((lang) => (
          <li key={lang.iso639_2}>{lang.name}</li>
        ))}
      </ul>
      <img src={data.flag} alt={data.name + "flag"} height="100px"></img>
    </div>
  );
};

const DisplayWeather = ({ countryData, matched }) => {
  const [load, setLoad] = useState(false);
  const [weather, setWeather] = useState({});

  const data = countryData.find((country) => country.name === matched);
  const api = process.env.REACT_APP_API_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${api}&query=${data.capital}`;
  const weatherHook = () => {
    axios.get(url).then((response) => {
      setWeather(response.data);
      setLoad(true);
    });
  };
  useEffect(weatherHook, []);

  // weather data isnt yet fetched
  if (!load) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {data.capital}</h2>
      <p>Pressure: {weather.current.pressure}</p>
      <p>Temperature: {weather.current.temperature}</p>
      <img
        src={weather.current.weather_icons[0]}
        alt={data.capital + "weather"}
        height="50px"
      ></img>
    </div>
  );
};

const Display = ({ userInp, countryData, setCountry }) => {
  // return nothing is there is no user input

  if (!userInp) {
    return null;
  }

  const matched = countryData
    .map((country) => country.name)
    .filter((country) => country.toLowerCase().includes(userInp.toLowerCase()));

  if (matched.length > 10) {
    return <p>Too many matches, Be more precise</p>;
  }

  if (matched.length === 1) {
    return (
      <div>
        <DisplaySingle countryData={countryData} matched={matched[0]} />
        <DisplayWeather countryData={countryData} matched={matched[0]} />
      </div>
    );
  }

  return (
    <div>
      {matched.map((country) => {
        return (
          <section key={country}>
            <span>{country}</span>
            <button onClick={() => setCountry(country)}>Show Info</button>
          </section>
        );
      })}
    </div>
  );
};

export default Display;
