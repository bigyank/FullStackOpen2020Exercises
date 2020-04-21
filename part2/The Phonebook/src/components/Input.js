import React from "react";

const Input = ({ onChange, name }) => (
  <div>
    {name} <input onChange={onChange}></input>
  </div>
);

export default Input;
