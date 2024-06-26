import axios from 'axios';

const axiosInstance = axios.create({
  // adding my AWS EC2 public IP
  baseURL: 'http://54.221.17.177:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
