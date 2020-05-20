import React, { useState } from 'react';
import '../Form.css';

//
const InputFeild = ({ name, id, blogFeilds, setBlogFeilds }) => {
  return (
    <section>
      {name}
      <input
        id={id}
        type='text'
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
    title: '',
    author: '',
    url: '',
  });

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    addNewBlog(blogFeilds);
    setBlogFeilds({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <form onSubmit={handleBlogSubmit} className='blogForm'>
      <InputFeild id='title' name='title' {...{ blogFeilds, setBlogFeilds }} />
      <InputFeild
        id='author'
        name='author'
        {...{ blogFeilds, setBlogFeilds }}
      />
      <InputFeild id='url' name='url' {...{ blogFeilds, setBlogFeilds }} />
      <button>Add</button>
    </form>
  );
};

export default BlogForm;
