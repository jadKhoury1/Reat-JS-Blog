import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/blog/public/api',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
});