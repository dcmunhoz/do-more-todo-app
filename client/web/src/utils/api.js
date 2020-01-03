import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost",
    withCredentials: true,
    headers: {
        "Authentication": (sessionStorage.getItem('token') ? sessionStorage.getItem('token') : "" )
    }
});

export default api;