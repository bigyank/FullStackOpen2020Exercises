import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

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

  // const loginUser = async (credentials) => {
  //   try {
  //     const user = await loginService.login(credentials);
  //     window.localStorage.setItem('loggedUser', JSON.stringify(user));
  //     blogService.setToken(user.token);
  //     setUser(user);
  //   } catch (error) {
  //     const message = error.response.data.error;
  //     handleNotification(message);
  //     setTimeout(() => {
  //       handleNotification(null);
  //     }, 5000);
  //   }
  // };

  // const addNewBlog = async (newBlog) => {
  //   blogFormRef.current.toggleVisible();
  //   try {
  //     const returnedBlog = await blogService.create(newBlog);
  //     const message = `${returnedBlog.title} by ${returnedBlog.author} successfully added`;
  //     handleNotification(message, 'success');
  //     setBlogs([...blogs, returnedBlog]);
  //   } catch (error) {
  //     const message = error.response.data.error;
  //     handleNotification(message);
  //     setTimeout(() => {
  //       handleNotification(null);
  //     }, 5000);
  //   }
  // };

  // const removeBlog = async (toRemoveBlog) => {
  //   if (user === null) {
  //     handleNotification('Not Authorized');
  //     return setTimeout(() => {
  //       handleNotification(null);
  //     }, 5000);
  //   }

  //   try {
  //     const remMsg = `Remove ${toRemoveBlog.title} by ${toRemoveBlog.author}?`;
  //     const userChoice = window.confirm(remMsg);
  //     if (!userChoice) {
  //       return null;
  //     }
  //     await blogService.remove(toRemoveBlog);
  //     const newBlogs = blogs.filter((blog) => toRemoveBlog.id !== blog.id);
  //     setBlogs(newBlogs);
  //     handleNotification('blog removed sucessfully', 'success');
  //   } catch (error) {
  //     const message = error.response.data.error;
  //     handleNotification(message);
  //     setTimeout(() => {
  //       handleNotification(null);
  //     }, 5000);
  //   }
  // };

  // const handleLogout = () => {
  //   window.localStorage.removeItem('loggedUser');
  //   setUser(null);
  // };

  // const loginForm = () => {
  //   return (
  //     <Togglable btnName="Login">
  //       <LoginForm loginUser={loginUser} />
  //     </Togglable>
  //   );
  // };

  // const blogForm = () => {
  //   return (
  //     <Togglable btnName="Add Blog" ref={blogFormRef}>
  //       <BlogForm addNewBlog={addNewBlog} />
  //     </Togglable>
  //   );
  // };

  // const handleLike = async (toUpdateBlog) => {
  //   toUpdateBlog = { ...toUpdateBlog, likes: toUpdateBlog.likes + 1 };
  //   const returnedBlog = await blogService.update(toUpdateBlog);
  //   const newBlogs = blogs.filter((blog) => blog.id !== toUpdateBlog.id);
  //   const sortedBlogs = arrayHelper.sortAsc([...newBlogs, returnedBlog]);
  //   setBlogs(sortedBlogs);
  // };

  return (
    <div>
      <h2>blogs</h2>
      {user ? <BlogForm /> : <LoginForm />}
      <Blog />
    </div>
  );
};

export default App;
