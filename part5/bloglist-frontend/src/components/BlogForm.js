import React, { useState } from "react";
import "../Form.css";

const InputFeild = ({ name, blogFeild, setNewBlog }) => {
  return (
    <section>
      {name}
      <input
        type="text"
        value={blogFeild[name]}
        name={name}
        onChange={({ target }) =>
          setNewBlog({ ...blogFeild, [name]: target.value })
        }
      />
    </section>
  );
};

const BlogForm = ({ addNewBlog }) => {
  const [blogFeilds, setBlogFeilds] = useState({
    title: "",
    author: "",
    url: "",
  });

  // const { title, author, url } = newBlog;

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    addNewBlog(blogFeilds);
    setBlogFeilds({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <form onSubmit={handleBlogSubmit} className="blogForm">
      <InputFeild
        name="title"
        blogFeild={blogFeilds}
        setNewBlog={setBlogFeilds}
      />
      <InputFeild
        name="author"
        blogFeild={blogFeilds}
        setNewBlog={setBlogFeilds}
      />
      <InputFeild
        name="url"
        blogFeild={blogFeilds}
        setNewBlog={setBlogFeilds}
      />
      <button>Add</button>
    </form>
  );
};

export default BlogForm;
