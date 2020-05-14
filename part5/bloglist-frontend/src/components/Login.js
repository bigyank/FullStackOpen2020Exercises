import React from "react";
import "../Form.css";

const Login = ({
  credentials: { username, password },
  handleLogin,
  setCredentials,
}) => {
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
