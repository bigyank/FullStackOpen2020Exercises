import React from "react";

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

export default DeleteBtn;
