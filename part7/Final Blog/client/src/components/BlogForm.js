import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TextField, Button } from '@material-ui/core';

import { useFeild } from '../hooks/Hooks';
import { addBlog } from '../reducers/blogReducer';
import { addNotification } from '../reducers/notificationReducer';

const InputFeild = ({ label, onChange, value }) => {
  return (
    <section>
      <TextField label={label} value={value} onChange={onChange} />
    </section>
  );
};

const BlogForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, titleService] = useFeild('text');
  const [author, authorService] = useFeild('text');
  const [url, urlService] = useFeild('text');

  const submitBlog = async (event) => {
    event.preventDefault();

    try {
      await dispatch(addBlog({ title, author, url }));
      titleService.reset();
      authorService.reset();
      urlService.reset();
      history.push('/');
      dispatch(addNotification('Blog Added', 5));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5, 'error'));
    }
  };

  return (
    <form onSubmit={submitBlog}>
      <InputFeild label="Title" value={title} {...titleService} />
      <InputFeild label="Author" value={author} {...authorService} />
      <InputFeild label="URL" value={url} {...urlService} />
      <Button type="submit" variant="outlined" color="primary">
        Submit
      </Button>
    </form>
  );
};

InputFeild.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BlogForm;
