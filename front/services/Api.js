import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.108/APISaude360/api',
});

export default api;