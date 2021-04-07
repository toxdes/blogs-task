import axios from "axios";

const axiosConfig = {
  baseURL: "http://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};
export default axios.create(axiosConfig);
