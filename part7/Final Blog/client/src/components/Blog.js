import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import BlogDetail from './BlogDetail';

const useStyles = makeStyles({
  blogCard: {
    marginTop: 10,
  },
});

const AllBlogs = ({ blogs }) => {
  const classes = useStyles();
  return (
    <div>
      {blogs.map((blog) => (
        <Card className={classes.blogCard} key={blog.id}>
          <CardContent>
            <Typography gutterBottom variant="h6">
              {blog.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              component={Link}
              to={`/blogs/${blog.id}`}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

const Blog = () => {
  const { path } = useRouteMatch();
  const blogs = useSelector((state) => state.blogs);

  const match = useRouteMatch('/blogs/:id');

  const blog = match
    ? blogs.find((blog) => blog.id === String(match.params.id))
    : null;

  return (
    <Switch>
      <Route path="/blogs/:id">
        <BlogDetail blog={blog} />
      </Route>
      <Route path={path}>
        <AllBlogs blogs={blogs} />
      </Route>
    </Switch>
  );
};

export default Blog;
