// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.REACT_APP_BURL}`, // Change port if your backend runs on a different one
});

export default instance;