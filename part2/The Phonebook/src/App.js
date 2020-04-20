import React, { useState } from "react";
import personService from "./services/persons";

const Form = ({ addNote, handleInputName, handleInputPhone }) => {
  return (
    <form onSubmit={addNote}>
      <Input name="Name" onChange={handleInputName} />
      <Input name="Phone" onChange={handleInputPhone} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Input = ({ onChange, name }) => (
  <div>
    {name} <input onChange={onChange}></input>
  </div>
);

const DeleteBtn = ({ name, id, onClick }) => {
  return (
    <button
      onClick={() => {
        onClick(name, id);
      }}
    >
      Delete
    </button>
  );
};

const DisplayPerson = ({ phonebook, keyWord, deletePerson }) => {
  if (!keyWord) {
    return (
      <div>
        {phonebook.map((person) => (
          <p key={person.name}>
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
  return match.map((item) => (
    <p key={item.name}>
      {item.name} {item.number}
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setPhone] = useState("");
  const [searchName, setSearchName] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    const isdublicate = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const newPerson = { ...isdublicate, name: newName, number: newPhone };
    if (isdublicate) {
      const replaceNum = window.confirm(
        `${newName} is already added to the phone book
        Do you want to replace the Number?`
      );
      if (!replaceNum) {
        return null;
      }
      return personService
        .updatePerson(newPerson.id, newPerson)
        .then((changedPerson) => {
          const updatedPersons = persons.map((person) =>
            person.id !== newPerson.id ? person : changedPerson
          );
          return updatedPersons;
        })
        .then(setPersons);
    }

    personService
      .postPerson(newPerson)
      .then((response) => setPersons([...persons, response]))
      .catch((e) => console.log(e));
    alert(`${newName} and ${newPhone} added to PhoneBook`);
  };

  const deleteNote = (name, id) => {
    const result = window.confirm(`Delete ${name}`);
    if (!result) {
      return null;
    }
    const newPersons = persons.filter((person) => person.id !== id);
    personService
      .deletePerson(id)
      .then(() => setPersons(newPersons))
      .catch((e) => console.log(e));
  };

  const handleInputName = (event) => {
    setNewName(event.target.value);
  };

  const handleInputPhone = (event) => {
    setPhone(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Input onChange={handleSearch}></Input>
      <h2>Add a New Phone Book</h2>
      <Form
        addNote={addNote}
        handleInputName={handleInputName}
        handleInputPhone={handleInputPhone}
      />
      <h2>Numbers</h2>
      <DisplayPerson
        phonebook={persons}
        keyWord={searchName}
        deletePerson={deleteNote}
      />
    </div>
  );
};

export default App;
