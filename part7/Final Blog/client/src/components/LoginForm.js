import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TextField, Button } from '@material-ui/core';

import { loginUser } from '../reducers/userReducer';
import { addNotification } from '../reducers/notificationReducer';
import { useFeild } from '../hooks/Hooks';

const InputFeild = ({ value, type, onChange, label }) => {
  return (
    <section>
      <TextField label={label} value={value} type={type} onChange={onChange} />
    </section>
  );
};

const LoginForm = () => {
  const history = useHistory();
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
      history.push('/');
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5, 'error'));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <InputFeild value={username} {...usernameService} label="Username" />
      <InputFeild value={password} {...passwordService} label="password" />
      <Button variant="outlined" color="primary" type="submit">
        Login
      </Button>
    </form>
  );
};

InputFeild.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoginForm;
