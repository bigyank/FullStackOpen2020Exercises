import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Form.css';

const InputFeild = ({ name, id, type, credentials, setCredentials }) => {
  return (
    <section>
      {name}
      <input
        id={id}
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
    username: '',
    password: '',
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    loginUser(credentials);
    setCredentials({ username: '', password: '' });
  };

  return (
    <form className='loginForm' onSubmit={handleLogin}>
      <InputFeild
        id='username'
        name='username'
        type='text'
        {...{ setCredentials, credentials }}
      />
      <InputFeild
        id='password'
        name='password'
        type='password'
        {...{ setCredentials, credentials }}
      />
      <button id='login-btn'>Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

InputFeild.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  credentials: PropTypes.object.isRequired,
  setCredentials: PropTypes.func.isRequired,
};

export default LoginForm;
