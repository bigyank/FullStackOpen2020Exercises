import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useToggle } from '../hooks/Hooks';

const Button = ({ name, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {name}
    </button>
  );
};

const BlogDetail = ({ url, likes, user }) => {
  return (
    <div>
      <p>Url : {url}</p>
      <p>
        Likes: {likes} <Button name="like" />
      </p>
      <p>Name: {user.name}</p>
      <Button name="remove" />
    </div>
  );
};

const SingleBlog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggle = useToggle();

  return (
    <div style={blogStyle}>
      {blog.title}{' '}
      {toggle.value ? (
        <Button name="show more" onClick={toggle.setValue} />
      ) : (
        <>
          <Button name="hide" onClick={toggle.setValue} />
          <BlogDetail {...blog} />
        </>
      )}
    </div>
  );
};

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);

  return blogs.map((blog) => <SingleBlog key={blog.id} blog={blog} />);
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

SingleBlog.propTypes = {
  blog: PropTypes.object.isRequired,
};

BlogDetail.propTypes = {
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
