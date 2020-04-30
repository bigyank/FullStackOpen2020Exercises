import React from "react";
import DeleteBtn from "./DeleteBtn";

const DisplayPerson = ({ phonebook, keyWord, deletePerson }) => {
  if (!keyWord) {
    return (
      <div>
        <h2>Contacts</h2>
        {phonebook.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
            <DeleteBtn
              name={person.name}
              id={person.id}
              onClick={deletePerson}
            />
          </p>
        ))}
      </div>
    );
  }

  const match = phonebook.filter((item) =>
    item.name.toLowerCase().includes(keyWord.toLowerCase())
  );
  return (
    <div>
      <h2>Search Results</h2>
      {match.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <DeleteBtn name={person.name} id={person.id} onClick={deletePerson} />
        </p>
      ))}
    </div>
  );
};

export default DisplayPerson;
