import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.105.205/APISaude360/api',
});

export default api;