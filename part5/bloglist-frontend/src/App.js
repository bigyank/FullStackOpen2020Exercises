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
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleNotification = (message, type = "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      const message = error.response.data.error;
      handleNotification(message);
      setTimeout(() => {
        handleNotification(null);
      }, 5000);
    } finally {
      setCredentials({ username: "", password: "" });
    }
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const blog = await blogService.create(newBlog);
  };
  return (
    <div>
      <Notification notification={notification} />

      {user == null ? (
        <Login
          credentials={credentials}
          setCredentials={setCredentials}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          {user.name} logged in
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
