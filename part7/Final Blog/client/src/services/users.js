import axios from 'axios';

const baseURL = '/api/users';

const getAll = async () => {
  const users = await axios.get(baseURL);
  return users.data;
};

export default { getAll };
