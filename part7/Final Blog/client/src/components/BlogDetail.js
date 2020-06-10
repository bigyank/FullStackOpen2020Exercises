import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { removeBlog, likeBlog, commentBlog } from '../reducers/blogReducer';
import { addNotification } from '../reducers/notificationReducer';
import { useFeild } from '../hooks/Hooks';

const Button = ({ name, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {name}
    </button>
  );
};

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, commentService] = useFeild();

  const handleForm = async (event) => {
    event.preventDefault();
    commentService.reset();
    try {
      await dispatch(commentBlog({ id: blog.id, content: comment }));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5));
    }
  };

  return (
    <form onSubmit={handleForm}>
      <CommentInp value={comment} {...commentService} />
    </form>
  );
};

const CommentInp = ({ value, type, onChange }) => {
  return (
    <input
      placeholder="Add Comment"
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemove = async () => {
    const remMsg = `Remove ${blog.title} by ${blog.author}?`;

    const userChoice = window.confirm(remMsg);
    if (!userChoice) {
      return null;
    }

    try {
      await dispatch(removeBlog(blog));
      history.push('/');
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

  if (!blog) {
    return null;
  }

  return (
    <div>
      <p>Title : {blog.title}</p>
      <p>Url : {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>Name: {blog.user.name}</p>
      <CommentForm blog={blog} />
      <p>Comments</p>
      {blog.comments.map((comment) => (
        <ul key={comment.id}>
          <li>{comment.content}</li>
        </ul>
      ))}
      <p>
        <Button name="like" onClick={handleLike} />
        <Button name="remove" onClick={handleRemove} />
      </p>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BlogDetail;
