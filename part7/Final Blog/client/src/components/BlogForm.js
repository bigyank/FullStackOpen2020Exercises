import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { useFeild } from '../hooks/Hooks';
import { addBlog } from '../reducers/blogReducer';
import { addNotification } from '../reducers/notificationReducer';

const InputFeild = ({ name, type, onChange, value }) => {
  return (
    <section>
      {name}
      <input type={type} value={value} onChange={onChange} />
    </section>
  );
};

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, titleService] = useFeild('text');
  const [author, authorService] = useFeild('text');
  const [url, urlService] = useFeild('text');

  const submitBlog = async (event) => {
    event.preventDefault();

    try {
      await dispatch(addBlog({ title, author, url }));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5));
    } finally {
      titleService.reset();
      authorService.reset();
      urlService.reset();
    }
  };

  return (
    <form onSubmit={submitBlog}>
      <InputFeild name="title" value={title} {...titleService} />
      <InputFeild name="author" value={author} {...authorService} />
      <InputFeild name="url" value={url} {...urlService} />
      <button id="addBlog-btn" type="submit">
        Add
      </button>
    </form>
  );
};

InputFeild.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BlogForm;
