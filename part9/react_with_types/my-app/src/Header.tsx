import React from "react";

interface HeaderTypes {
  title: string;
}

const Header: React.FC<HeaderTypes> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
