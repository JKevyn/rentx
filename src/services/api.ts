import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.27.94:3334'
})

export default api;