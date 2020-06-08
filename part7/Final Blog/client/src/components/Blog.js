import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { removeBlog, likeBlog } from '../reducers/blogReducer';
import { addNotification } from '../reducers/notificationReducer';
import { useToggle } from '../hooks/Hooks';

const Button = ({ name, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {name}
    </button>
  );
};

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch();

  const handleRemove = async () => {
    const remMsg = `Remove ${blog.title} by ${blog.author}?`;

    const userChoice = window.confirm(remMsg);
    if (!userChoice) {
      return null;
    }

    try {
      await dispatch(removeBlog(blog));
      dispatch(addNotification('blog removed sucessfully', 5));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5));
    }
  };

  const handleLike = async () => {
    const toUpdateBlog = { ...blog, likes: blog.likes + 1 };
    try {
      await dispatch(likeBlog(toUpdateBlog));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5));
    }
  };

  return (
    <div>
      <p>Url : {blog.url}</p>
      <p>
        Likes: {blog.likes} <Button name="like" onClick={handleLike} />
      </p>
      <p>Name: {blog.user.name}</p>
      <Button name="remove" onClick={handleRemove} />
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
          <BlogDetail blog={blog} />
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
  blog: PropTypes.object.isRequired,
};

export default Blog;
