import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

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
      <h2>blogs</h2>
      <Notification />
      {user ? <BlogForm /> : <LoginForm />}
      <Blog />
    </div>
  );
};

export default App;
