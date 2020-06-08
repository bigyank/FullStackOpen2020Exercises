import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { loginUser } from '../reducers/userReducer';
import { addNotification } from '../reducers/notificationReducer';
import { useFeild } from '../hooks/Hooks';

const InputFeild = ({ value, type, onChange }) => {
  return (
    <section>
      Username: <input value={value} type={type} onChange={onChange} />
    </section>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, usernameService] = useFeild('text');
  const [password, passwordService] = useFeild('password');

  const handleLogin = async (event) => {
    event.preventDefault();

    usernameService.reset();
    passwordService.reset();

    try {
      await dispatch(
        loginUser({
          username,
          password,
        })
      );
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <InputFeild value={username} {...usernameService} />
      <InputFeild value={password} {...passwordService} />
      <button type="submit" id="login-btn">
        Login
      </button>
    </form>
  );
};

InputFeild.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoginForm;
