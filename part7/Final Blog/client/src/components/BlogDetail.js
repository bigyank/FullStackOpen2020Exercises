import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

import Dialouge from './Dialouge';
import { removeBlog, likeBlog, commentBlog } from '../reducers/blogReducer';
import { addNotification } from '../reducers/notificationReducer';
import { useFeild } from '../hooks/Hooks';

const useStyles = makeStyles({
  blogInfo: {
    marginTop: 10,
  },
  blogBody: {
    marginLeft: 20,
  },
  buttonStyle: {
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  commentFeild: {
    marginTop: 10,
  },
});

const CommentInp = ({ value, type, onChange }) => {
  const classes = useStyles();
  return (
    <TextField
      label="Comment"
      variant="outlined"
      size="small"
      value={value}
      type={type}
      onChange={onChange}
      className={classes.commentFeild}
    />
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
      dispatch(addNotification('Added', 5));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5, 'error'));
    }
  };

  return (
    <form onSubmit={handleForm}>
      <CommentInp value={comment} {...commentService} />
    </form>
  );
};

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleRemove = async () => {
    try {
      await dispatch(removeBlog(blog));
      history.push('/');
      dispatch(addNotification('blog removed sucessfully', 5));
      dispatch(addNotification('removed', 5, 'error'));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5, 'error'));
    }
  };

  const handleLike = async () => {
    const toUpdateBlog = { ...blog, likes: blog.likes + 1 };
    try {
      await dispatch(likeBlog(toUpdateBlog));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(addNotification(message, 5, 'error'));
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <Paper className={classes.blogInfo} elevation={3}>
      <div className={classes.blogBody}>
        <Typography variant="h4" color="primary">
          {blog.title}
        </Typography>
        <Typography color="textSecondary" variant="h6">
          Author : {blog.author}
        </Typography>
        <Typography color="textSecondary" variant="h6">
          Url : {blog.url}
        </Typography>
        <Typography color="textSecondary" variant="h6">
          Likes: {blog.likes}
        </Typography>
        <Typography color="textSecondary" variant="h6">
          Name: {blog.user.name}
        </Typography>

        <CommentForm blog={blog} />

        <Button
          className={classes.buttonStyle}
          variant="contained"
          color="primary"
          onClick={handleLike}
          startIcon={<SentimentVerySatisfiedIcon />}
        >
          Like
        </Button>

        <Dialouge deleteBlog={handleRemove} />
        <Typography variant="h5" color="secondary">
          Comments
        </Typography>
        <List>
          {blog.comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.content} />
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default BlogDetail;
