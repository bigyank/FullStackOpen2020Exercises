import React from "react";
import Input from "./Input";

const Search = ({ handleSearch }) => {
  return (
    <div>
      <Input name="Search" onChange={handleSearch}></Input>
    </div>
  );
};

export default Search;
