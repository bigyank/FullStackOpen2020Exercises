import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const postPerson = (data) => {
  return axios.post(baseURL, data).then((response) => response.data);
};

const updatePerson = (id, data) => {
  return axios
    .put(baseURL.concat("/", id), data)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(baseURL.concat("/", id));
};

export default { getAll, postPerson, updatePerson, deletePerson };
