import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';

import BlogDetail from './BlogDetail';

const AllBlogs = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
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
