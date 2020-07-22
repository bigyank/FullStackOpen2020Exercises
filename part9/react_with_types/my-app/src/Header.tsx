import React from "react";
import { HeaderTypes } from "./types";

const Header: React.FC<HeaderTypes> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
