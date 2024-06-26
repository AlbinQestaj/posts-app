import axios from 'axios';

const axiosInstance = axios.create({
  // adding my AWS EC2 public IP
  baseURL: 'http://54.221.17.177:5000/api/posts',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
