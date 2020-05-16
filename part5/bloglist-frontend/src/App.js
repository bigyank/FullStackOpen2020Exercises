import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
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

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
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
    } finally {
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <div>
      <Notification notification={notification} />

      {user == null ? (
        <Login loginUser={loginUser} />
      ) : (
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <BlogForm
            handleBlogSubmit={handleBlogSubmit}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
          />
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
