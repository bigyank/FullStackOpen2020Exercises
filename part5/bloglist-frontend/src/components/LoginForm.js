import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Form.css';

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
        name='username'
        type='text'
        {...{ setCredentials, credentials }}
      />
      <InputFeild
        name='password'
        type='password'
        {...{ setCredentials, credentials }}
      />
      <button>Login</button>
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
