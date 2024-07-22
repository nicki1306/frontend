import axios from 'axios';

// Configuración global de Axios
const api = axios.create();
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

export default api;
