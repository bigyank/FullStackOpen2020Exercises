import React, { useState } from "react";
import personService from "./services/persons";
import Form from "./components/Form";
import DisplayPerson from "./components/Display";
import Search from "./components/Search";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setPhone] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

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
        .then(setPersons)
        .catch((e) => console.log(e));
    }

    personService
      .postPerson(newPerson)
      .then((response) => {
        setPersons([...persons, response]);
        setMessage(`added ${newPerson.name}`);
        setMessageType("add");
        setTimeout(() => setMessageType(null), 5000);
      })
      .catch(() => {
        setMessage(`Unable to add ${newPerson.name}`);
        setMessageType("error");
        setTimeout(() => {
          setMessageType(null);
        }, 5000);
      });
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
      <Notification type={messageType} message={message} />
      <Search handleSearch={handleSearch} />
      <Form
        addNote={addNote}
        handleInputName={handleInputName}
        handleInputPhone={handleInputPhone}
      />
      <h2>Search Result</h2>
      <DisplayPerson
        phonebook={persons}
        keyWord={searchName}
        deletePerson={deleteNote}
      />
    </div>
  );
};

export default App;
