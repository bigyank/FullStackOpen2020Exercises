import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { initBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

import Blog from './components/Blog';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import NavBar from './components/NavBar';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser());
    dispatch(initBlogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = useSelector((state) => state.user);
  // const handleNotification = (message, type = 'error') => {
  //   setNotification({ message, type });
  //   setTimeout(() => {
  //     setNotification(null);
  //   }, 5000);
  // };

  // const handleLogout = () => {
  //   window.localStorage.removeItem('loggedUser');
  //   setUser(null);
  // };

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/create">
          <BlogForm />
        </Route>
        <Route path="/">
          <Blog />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
