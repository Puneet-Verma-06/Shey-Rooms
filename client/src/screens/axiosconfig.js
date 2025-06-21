// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Change port if your backend runs on a different one
});

export default instance;