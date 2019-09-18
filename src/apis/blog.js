import axios from 'axios';

export default () => {
     // grab auth user from local storage
    const authUser = localStorage.getItem('auth_user');
    
    // get user token from the store
    const token = authUser ? JSON.parse(authUser).token : '';
 
    return axios.create({
        baseURL: 'http://localhost/blog/public/api',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}