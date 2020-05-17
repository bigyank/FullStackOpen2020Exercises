import React, { useState } from "react";

const BlogInfo = ({ blog, handleLike }) => {
  return (
    <div>
      <p>Url : {blog.url}</p>
      <p>
        Likes: {blog.likes} <LikeBtn blog={blog} handleLike={handleLike} />
      </p>
      <p>Name: {blog.user.name}</p>
    </div>
  );
};

const LikeBtn = ({ blog, handleLike }) => {
  return (
    <button
      onClick={() => {
        handleLike(blog);
      }}
    >
      Like
    </button>
  );
};

const Blog = ({ blog, handleLike }) => {
  const [blogDisplay, setBlogDisplay] = useState(false);

  const toggleBtn = () => {
    setBlogDisplay(!blogDisplay);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {blogDisplay ? (
        <>
          <button onClick={toggleBtn}>Hide</button>
          <BlogInfo blog={blog} handleLike={handleLike} />
        </>
      ) : (
        <button onClick={toggleBtn}>Show</button>
      )}
    </div>
  );
};

export default Blog;
