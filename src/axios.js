import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_PROD || import.meta.env.VITE_API_URL_DEV,
    withCredentials: true,
});

export default instance;
