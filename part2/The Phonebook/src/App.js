import React, { useState } from "react";

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

const DisplayPerson = ({ phonebook, keyWord }) => {
  if (!keyWord) {
    return <></>;
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
    const isdublicate = persons.find((person) => person.name === newName);
    if (isdublicate) {
      return alert(`${newName} is already added to the phone book`);
    }
    const newPerson = { name: newName, number: newPhone };
    setPersons([...persons, newPerson]);
    alert(`${newName} and ${newPhone} added to PhoneBook`);
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
      <DisplayPerson phonebook={persons} keyWord={searchName} />
    </div>
  );
};

export default App;
