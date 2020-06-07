import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const remove = async (removeObject) => {
  const { id } = removeObject;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(baseUrl.concat(`/${id}`), config);
  return response.data;
};

const update = async (userObject) => {
  const newObject = { ...userObject, user: userObject.user.id };
  const { id } = newObject;
  const response = await axios.put(baseUrl.concat(`/${id}`), newObject);
  return response.data;
};

export default { getAll, setToken, create, update, remove };
