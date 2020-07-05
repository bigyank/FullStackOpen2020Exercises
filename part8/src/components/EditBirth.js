import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_BIRTH } from "../queries/queries";

const EditBirth = ({ show, notify }) => {
  const [editBirth] = useMutation(EDIT_BIRTH, {
    onError: (error) => notify(error.graphQLErrors[0].message),
  });
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
        <div>
          Name:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Birth:
          <input
            type="number"
            value={birth}
            onChange={({ target }) => setBirth(target.value)}
          />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditBirth;
