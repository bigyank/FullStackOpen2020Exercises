import React, { useState } from "react";
import "../Form.css";

const Login = ({ loginUser }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { username, password } = credentials;

  const handleLogin = async (event) => {
    event.preventDefault();
    loginUser(credentials);
    setCredentials({ username: "", password: "" });
  };

  return (
    <form className="loginForm" onSubmit={handleLogin}>
      <section>
        Username
        <input
          value={username}
          type="text"
          name="username"
          onChange={({ target }) => {
            setCredentials({ password, username: target.value });
          }}
        />
      </section>
      <section>
        Password
        <input
          value={password}
          type="password"
          name="password"
          onChange={({ target }) => {
            setCredentials({ username, password: target.value });
          }}
        />
      </section>
      <button>Login</button>
    </form>
  );
};

export default Login;
