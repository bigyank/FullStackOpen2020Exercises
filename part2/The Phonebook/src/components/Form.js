import React from "react";
import Input from "./Input";

const Form = ({ addNote, handleInputName, handleInputPhone }) => {
  return (
    <div>
      <h2>Add a New Phone Book</h2>
      <form onSubmit={addNote}>
        <Input name="Name" onChange={handleInputName} />
        <Input name="Phone" onChange={handleInputPhone} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
