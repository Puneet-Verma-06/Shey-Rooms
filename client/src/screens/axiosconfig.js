// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BURL}`, // Change port if your backend runs on a different one
});

export default instance;