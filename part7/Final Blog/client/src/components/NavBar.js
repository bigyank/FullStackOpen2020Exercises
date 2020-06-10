import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { logoutUser } from '../reducers/userReducer';

const LoginBtn = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <button type="button" onClick={handleLogin}>
      Login
    </button>
  );
};

const LogoutBtn = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

const NavBar = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Link to="/">Blog</Link>
      {user && <Link to="/create">Create</Link>}
      {user && <Link to="/users">Users</Link>}
      {user ? <LogoutBtn /> : <LoginBtn />}
    </div>
  );
};

export default NavBar;
