import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useApolloClient } from "@apollo/client";

import Notify from "./components/Notify";
import Authors from "./components/Authors";
import Books from "./components/Books";
import EditBirth from "./components/EditBirth";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommended from "./components/Recommended";

import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMsg, setErrorMsg] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);
  const [getFavGenre, favGenre] = useLazyQuery(ME);

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
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button
            onClick={() => {
              setPage("recommended");
              getFavGenre();
            }}
          >
            recommended
          </button>
        )}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} allAuthors={allAuthors} />
      {token && <EditBirth show={page === "authors"} notify={notify} />}
      <Books show={page === "books"} allBooks={allBooks} />
      <NewBook show={page === "add"} notify={notify} />
      <Recommended show={page === "recommended"} {...{ allBooks, favGenre }} />
      <Login show={page === "login"} {...{ setToken, notify, setPage }} />
    </div>
  );
};

export default App;
