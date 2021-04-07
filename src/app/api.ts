import axios from "axios";

const axiosConfig = {
  baseURL: "http://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
};
export default axios.create(axiosConfig);
