import React from "react";

const DisplaySingle = ({ countryData, matched }) => {
  const data = countryData.find((country) => country.name === matched[0]);
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.capital}</p>
      <p>{data.population}</p>
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

const Display = ({ userInp, countryData }) => {
  // return nothing is there is no user input
  if (!userInp) {
    return null;
  }

  const matched = countryData
    .map((country) => country.name)
    .filter((name) => name.toLowerCase().includes(userInp.toLowerCase()));

  if (matched.length > 10) {
    return <p>Too many matches, Be more precise</p>;
  }

  if (matched.length === 1) {
    return <DisplaySingle countryData={countryData} matched={matched} />;
  }

  return (
    <div>
      {matched.map((country) => {
        return <p key={country}>{country}</p>;
      })}
    </div>
  );
};

export default Display;
