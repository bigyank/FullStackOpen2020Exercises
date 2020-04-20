import axios from "axios";

const baseURL = "http://localhost:3001/persons";

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

export default { postPerson, updatePerson, deletePerson };
