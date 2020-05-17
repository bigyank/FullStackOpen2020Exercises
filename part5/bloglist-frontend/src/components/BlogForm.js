import React, { useState } from "react";
import "../Form.css";

//
const InputFeild = ({ name, blogFeilds, setBlogFeilds }) => {
  return (
    <section>
      {name}
      <input
        type="text"
        value={blogFeilds[name]}
        name={name}
        onChange={({ target }) =>
          setBlogFeilds({ ...blogFeilds, [name]: target.value })
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
      <InputFeild name="title" {...{ blogFeilds, setBlogFeilds }} />
      <InputFeild name="author" {...{ blogFeilds, setBlogFeilds }} />
      <InputFeild name="url" {...{ blogFeilds, setBlogFeilds }} />
      <button>Add</button>
    </form>
  );
};

export default BlogForm;
