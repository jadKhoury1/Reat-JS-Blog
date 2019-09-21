import axios from 'axios';

export default () => {
    console.log('api: ', process.env.REACT_APP_BASE_URL);
     // grab auth user from local storage
    const authUser = localStorage.getItem('auth_user');
    
    // get user token from the store
    const token = authUser ? JSON.parse(authUser).token : '';
    
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost/blog/public/api',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}