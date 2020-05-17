import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import blogUtil from "./utils/arrayHelper";
import arrayHelper from "./utils/arrayHelper";

const App = () => {
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const blogFormRef = React.createRef();

  useEffect(() => {
    const getBlog = async () => {
      const blogs = await blogService.getAll();
      const sortedBlogs = blogUtil.sortAsc(blogs);
      setBlogs(sortedBlogs);
    };
    getBlog();
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleNotification = (message, type = "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const loginUser = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      const message = error.response.data.error;
      handleNotification(message);
      setTimeout(() => {
        handleNotification(null);
      }, 5000);
    }
  };

  const addNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisible();
    try {
      const returnedBlog = await blogService.create(newBlog);
      const message = `${returnedBlog.title} by ${returnedBlog.author} successfully added`;
      handleNotification(message, "success");
      setBlogs([...blogs, returnedBlog]);
    } catch (error) {
      const message = error.response.data.error;
      handleNotification(message);
      setTimeout(() => {
        handleNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const loginForm = () => {
    return (
      <Togglable btnName="Login">
        <LoginForm loginUser={loginUser} />
      </Togglable>
    );
  };

  const blogForm = () => {
    return (
      <Togglable btnName="Add Blog" ref={blogFormRef}>
        <BlogForm addNewBlog={addNewBlog} />
      </Togglable>
    );
  };

  const handleLike = async (toUpdateBlog) => {
    toUpdateBlog = { ...toUpdateBlog, likes: toUpdateBlog.likes + 1 };
    const returnedBlog = await blogService.update(toUpdateBlog);
    const newBlogs = blogs.filter((blog) => blog.id !== toUpdateBlog.id);
    const sortedBlogs = arrayHelper.sortAsc([...newBlogs, returnedBlog]);
    setBlogs(sortedBlogs);
  };

  return (
    <div>
      <Notification notification={notification} />

      {user == null ? (
        loginForm()
      ) : (
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog blog={blog} handleLike={handleLike} />
        </div>
      ))}
    </div>
  );
};

export default App;
