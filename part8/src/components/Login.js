import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN, ME } from "../queries/queries";

const Login = ({ setToken, notify, show, setPage, setUserFav }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [getFavGenre, result] = useLazyQuery(ME);

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

  useEffect(() => {
    if (result.data) {
      const favGenre = result.data.me.favoriteGenre;
      setUserFav(favGenre);
      localStorage.setItem("favGenre", favGenre);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

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
