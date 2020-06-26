import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_BIRTH } from "../queries/queries";

const EditBirth = ({ show }) => {
  const [editBirth] = useMutation(EDIT_BIRTH);
  const [author, setAuthor] = useState("");
  const [birth, setBirth] = useState("");

  const handleEdit = (event) => {
    event.preventDefault();

    editBirth({ variables: { name: author, born: Number(birth) } });

    setAuthor("");
    setBirth("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h3>Edit Birthdate</h3>
      <form onSubmit={handleEdit}>
        Name:
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        Birth:
        <input
          value={birth}
          onChange={({ target }) => setBirth(target.value)}
        />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditBirth;
