import React, { useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN, ME } from "../queries/queries";

const Login = ({ setToken, notify, show, setPage, setUserFav }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");

  const [getFavGenre] = useLazyQuery(ME, {
    onCompleted: (data) => {
      const favGenre = data.me.favoriteGenre;
      setUserFav(favGenre);
      localStorage.setItem("favGenre", favGenre);
    },
  });

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("user", token);
      getFavGenre();
      setPage("authors");
    },
  });

  const submitLogin = (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");
    login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={submitLogin}>
      <div>
        Username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
