import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, ME } from "../queries/queries";

const Login = ({ setToken, notify, show, setPage }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [login] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }],
    onError: (error) => {
      notify(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("user", token);
      setPage("authors");
    },
  });

  // useEffect(() => {
  //   if (result.data) {
  //     const token = result.data.login.value;
  //     setToken(token);
  //     localStorage.setItem("user", token);
  //     setPage("authors");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [result.data, setPage, setToken]);

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
