import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./components/Input";
import Display from "./components/Display";

const App = () => {
  const [country, setCountry] = useState("");
  const [countryapi, setCountryApi] = useState([]);

  const handleInput = (event) => {
    setCountry(event.target.value);
  };

  const hook = () => {
    const afterData = (countrydata) => {
      setCountryApi(countrydata.data);
    };
    axios.get("https://restcountries.eu/rest/v2/all").then(afterData);
  };
  useEffect(hook, []);

  return (
    <div>
      <h1>Country Finder</h1>
      <Input name="Country" onChange={handleInput} />
      <Display userInp={country} countryData={countryapi} />
    </div>
  );
};

export default App;
