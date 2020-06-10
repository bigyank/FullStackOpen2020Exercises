import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import userService from '../services/users';

const AllUsers = ({ users }) => {
  const { url } = useRouteMatch();
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <table key={user.id}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Blogs Created</th>
            </tr>
            <tr>
              <td>
                <Link to={`${url}/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

const SingleUser = ({ name, blogs }) => {
  if (!name) {
    return null;
  }
  return (
    <div>
      <h2>{name}</h2>
      {blogs.map((blog) => (
        <ul key={blog.id}>
          <li>{blog.title}</li>
        </ul>
      ))}
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
