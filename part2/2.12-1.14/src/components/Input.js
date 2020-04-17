import React from "react";

const Input = ({ name, onChange }) => {
  return (
    <div>
      {name}: <input onChange={onChange}></input>
    </div>
  );
};

export default Input;
