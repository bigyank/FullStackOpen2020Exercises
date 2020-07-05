import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import Login from "./components/Login";
import Notify from "./components/Notify";
import LoggedView from "./components/LoggedView";

import { ALL_AUTHORS, ALL_BOOKS } from "./queries/queries";

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

  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);

  const notify = (message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMsg={errorMsg} />
        <Login {...{ setToken, notify }} />
      </div>
    );
  }

  return (
    <LoggedView
      {...{ allAuthors, allBooks, page, setPage, errorMsg, setToken, notify }}
    />
  );
};

export default App;
