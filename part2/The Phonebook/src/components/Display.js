import React from "react";
import DeleteBtn from "./DeleteBtn";

const DisplayPerson = ({ phonebook, keyWord, deletePerson }) => {
  if (!keyWord) {
    return null;
  }

  const match = phonebook.filter((item) =>
    item.name.toLowerCase().includes(keyWord.toLowerCase())
  );
  return match.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
      <DeleteBtn name={person.name} id={person.id} onClick={deletePerson} />
    </p>
  ));
};

export default DisplayPerson;
