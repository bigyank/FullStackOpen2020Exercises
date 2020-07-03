import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditBirth from "./components/EditBirth";
import Notify from "./components/Notify";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMsg, setErrorMsg] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const notify = (message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return <div>logged in</div>;
};

export default App;
