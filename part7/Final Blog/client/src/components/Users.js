import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import userService from '../services/users';

const AllUsers = ({ users }) => {
  const { url } = useRouteMatch();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`${url}/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const SingleUser = ({ name, blogs }) => {
  if (!name) {
    return null;
  }
  return (
    <div>
      <Typography variant="h6">{name}</Typography>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const { path } = useRouteMatch();

  const userId = path.concat('/:id');
  const match = useRouteMatch(userId);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await userService.getAll();
      setUsers(allUsers);
    };
    getUsers();
  }, []);

  const user = match
    ? users.find((user) => user.id === String(match.params.id))
    : null;

  return (
    <div>
      <Switch>
        <Route path={`${path}/:id`}>
          <SingleUser {...user} />
        </Route>
        <Route path={path}>
          <AllUsers users={users} />
        </Route>
      </Switch>
    </div>
  );
};

export default Users;
