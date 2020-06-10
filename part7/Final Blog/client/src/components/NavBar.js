import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { logoutUser } from '../reducers/userReducer';

const useStyles = makeStyles({
  userNameNav: {
    flex: 1,
  },
});

const LoginBtn = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <Button onClick={handleLogin} color="inherit">
      Login
    </Button>
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
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
  );
};

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        {user ? (
          <Typography className={classes.userNameNav}>{user.name}</Typography>
        ) : null}
        <Button color="inherit" component={Link} to="/">
          Blog
        </Button>
        {user && (
          <Button color="inherit" component={Link} to="/create">
            Create
          </Button>
        )}
        {user && (
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        )}
        {user ? <LogoutBtn /> : <LoginBtn />}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
