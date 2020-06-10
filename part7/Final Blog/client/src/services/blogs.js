import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const unsetToken = () => {
  token = null;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
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
  const config = {
    headers: { Authorization: token },
  };

  const newObject = { ...userObject, user: userObject.user.id };
  const { id } = newObject;
  const response = await axios.put(baseUrl.concat(`/${id}`), newObject, config);
  return response.data;
};

const comment = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const { id } = blogObject;
  const newObject = { content: blogObject.content };

  const response = await axios.post(
    baseUrl.concat(`/${id}/comments`),
    newObject,
    config
  );
  return response.data;
};

export default {
  getAll,
  setToken,
  unsetToken,
  create,
  update,
  remove,
  comment,
};
