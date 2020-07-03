import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user", token);
    }
  }, [result.data]);

  const submitLogin = (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");
    login({ variables: { username, password } });
  };

  return (
    <form onSubmit={submitLogin}>
      Username:
      <input
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      Password
      <input
        type="password"
        value={password}
        onChange={({ target }) => {
          setPassword(target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
