import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

import Notify from "./components/Notify";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommended from "./components/Recommended";
import EditBirth from "./components/EditBirth";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMsg, setErrorMsg] = useState(null);
  const [token, setToken] = useState(null);
  const [userFav, setUserFav] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken) {
      setToken(userToken);
    }

    const userFavGenre = localStorage.getItem("favGenre");
    if (userFavGenre) {
      setUserFav(userFavGenre);
    }
  }, []);

  const notify = (message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <Notify errorMsg={errorMsg} />
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} notify={notify} />
      {token && <EditBirth show={page === "authors"} notify={notify} />}
      <Books show={page === "books"} />
      <NewBook show={page === "add"} notify={notify} />
      <Recommended show={page === "recommended"} userFav={userFav} />
      <Login
        show={page === "login"}
        {...{ setToken, notify, setPage, setUserFav }}
      />
    </div>
  );
};

export default App;
