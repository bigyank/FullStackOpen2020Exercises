import React, { useState } from 'react';

const BlogInfo = ({ blog, handleLike, removeBlog }) => {
  return (
    <div>
      <p>Url : {blog.url}</p>
      <p>
        Likes: {blog.likes}{' '}
        <Button name='like' blog={blog} handleEvent={handleLike} />
      </p>
      <p>Name: {blog.user.name}</p>
      <Button name='remove' blog={blog} handleEvent={removeBlog} />
    </div>
  );
};

const Button = ({ name, blog, handleEvent }) => {
  return (
    <button
      onClick={() => {
        handleEvent(blog);
      }}
    >
      {name}
    </button>
  );
};

const Blog = ({ blog, handleLike, removeBlog }) => {
  const [blogDisplay, setBlogDisplay] = useState(false);

  const toggleBtn = () => {
    setBlogDisplay(!blogDisplay);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {blogDisplay ? (
        <>
          <button onClick={toggleBtn}>Hide</button>
          <BlogInfo {...{ blog, handleLike, removeBlog }} />
        </>
      ) : (
        <button onClick={toggleBtn}>Show</button>
      )}
    </div>
  );
};

export default Blog;
