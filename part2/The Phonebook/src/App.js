import React, { useState, useEffect } from "react";
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
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then(setPersons);
  }, []);

  const notifyWith = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const oldPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const newPerson = { ...oldPerson, name: newName, number: newPhone };
    if (oldPerson) {
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
        .then((updatePerson) => {
          setPersons(updatePerson);
          notifyWith(`${newPerson.name} updated sucessfully`);
        })
        .catch((e) => {
          console.log(e);
          notifyWith(`unable to update ${newPerson.name}`, "error");
        });
    }

    personService
      .postPerson(newPerson)
      .then((response) => {
        setPersons([...persons, response]);
        notifyWith(`${newPerson.name} added sucessfully`);
      })
      .catch((e) => {
        console.log(e);
        notifyWith(`Unable to add ${newPerson.name}`, "error");
      });
  };

  const deletePerson = (name, id) => {
    const result = window.confirm(`Delete ${name}`);
    if (!result) {
      return null;
    }
    const newPersons = persons.filter((person) => person.id !== id);
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(newPersons);
        notifyWith(`Deleted ${name}`, "error");
      })
      .catch((e) => {
        console.log(e);
        notifyWith(`Unable to delete ${name}`, "error");
      });
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
      <Notification notification={notification} />
      <Search handleSearch={handleSearch} />
      <Form
        addPerson={addPerson}
        handleInputName={handleInputName}
        handleInputPhone={handleInputPhone}
      />
      <h2>Search Result</h2>
      <DisplayPerson
        phonebook={persons}
        keyWord={searchName}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
