import React from "react";

const Notify = ({ errorMsg }) => {
  if (!errorMsg) {
    return null;
  }

  return <div style={{ color: "red" }}>{errorMsg}</div>;
};

export default Notify;
