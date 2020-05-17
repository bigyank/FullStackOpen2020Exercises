import React, { useState } from "react";
import "../Form.css";

const InputFeild = ({ name, type, credentials, setCredentials }) => {
  return (
    <section>
      {name}
      <input
        value={credentials[name]}
        name={name}
        type={type}
        onChange={({ target }) =>
          setCredentials({ ...credentials, [name]: target.value })
        }
      />
    </section>
  );
};

const LoginForm = ({ loginUser }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    loginUser(credentials);
    setCredentials({ username: "", password: "" });
  };

  return (
    <form className="loginForm" onSubmit={handleLogin}>
      <InputFeild
        name="username"
        type="text"
        {...{ setCredentials, credentials }}
      />
      <InputFeild
        name="password"
        type="password"
        {...{ setCredentials, credentials }}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
