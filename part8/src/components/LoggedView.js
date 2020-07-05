import React from "react";
import { useApolloClient } from "@apollo/client";

import Notify from "./Notify";
import Authors from "./Authors";
import Books from "./Books";
import EditBirth from "./EditBirth";
import NewBook from "./NewBook";

const LoggedView = ({
  errorMsg,
  page,
  setPage,
  allAuthors,
  notify,
  allBooks,
  setToken,
}) => {
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <Notify errorMsg={errorMsg} />
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} allAuthors={allAuthors} />
      <EditBirth show={page === "authors"} notify={notify} />

      <Books show={page === "books"} allBooks={allBooks} />

      <NewBook show={page === "add"} notify={notify} />
    </div>
  );
};

export default LoggedView;
