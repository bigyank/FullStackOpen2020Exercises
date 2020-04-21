import React from "react";

const Notification = ({ type, message }) => {
  const sucessStyle = {
    color: "green",
    border: "8px solid green",
    margin: 10,
    padding: 5,
  };

  const errorStyle = {
    color: "red",
    border: "8px solid red",
    margin: 10,
    padding: 5,
  };

  if (type == null) {
    return null;
  }

  if (type === "error") {
    return (
      <div style={errorStyle}>
        <p>{message}</p>
      </div>
    );
  }
  return (
    <div style={sucessStyle}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
