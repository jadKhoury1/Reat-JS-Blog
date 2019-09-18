import blog from '../apis/blog';
import history from '../history';

import { 
    REGISTER, SIGN_IN, SIGN_OUT, 
    FETCH_POSTS, FETCH_POST, CREATE_POST,
    EDIT_POST, DELETE_POST, STATUS_FAILED, AUTHENTICATE
} from './types';


export const authenticate = data => {
    return {
        type: AUTHENTICATE,
        payload: data
    };
};

export const registerAcion = (data, callback) => async dispatch => {
    const response = await blog().post('/register', data);
    const errors = checkForErrors(response);
    if (errors) {
        callback(errors);
    } else {
        localStorage.setItem('auth_user', JSON.stringify(response.data.response));
        dispatch({ type: REGISTER, payload: response.data.response });
        history.push('/');
    }
};

export const signIn = (data, callback) => async dispatch => {
    const response = await blog().post('/login', data);
    const errors = checkForErrors(response);
    if (errors) {
        callback(errors);
    } else {
        localStorage.setItem('auth_user', JSON.stringify(response.data.response));
        dispatch({ type: SIGN_IN, payload: response.data.response });
        history.push('/');
    }
}

export const signOut = () => async dispatch => {
    await blog().post('/logout');
    localStorage.removeItem('auth_user');
    dispatch({ type: SIGN_OUT });
    history.push('/', {refresh: true});
} 


export const fetchPosts = () => async dispatch => {
    const response = await blog().get('/posts/get');
    dispatch({ type: FETCH_POSTS, payload: response.data.response.posts });
};

export const fetchPost = id => async dispatch => {
    const response = await blog().get(`/post/get/${id}`);
    dispatch({ type: FETCH_POST, payload: response.data });
}

export const createPost = (data, callback) => async dispatch => {
    const response = await blog().post('/post/add', data);
    const errors = checkForErrors(response);
    if (errors) {
        if (errors === 'Unauthenticated') {
            history.push('/auth/login');
        } else {
            callback(errors);
        }
    } else {
        dispatch({ type: CREATE_POST, payload: response.data.response.post });
        history.push('/');
    }
}

export const editPost = (id, data) => async dispatch => {
    const response = await blog().put(`/post/edit/${id}`, data);
    dispatch({ type: EDIT_POST, payload: response.data });
}

export const deletePost = id => async dispatch => {
    const response = await blog().delete(`/post/delete/${id}`);
    dispatch({ type: DELETE_POST, payload: response.data });
}

const checkForErrors = response => {
    const { status } = response.data;

    if (!status) {
        const { message } = response.data;
        return message ? message : 'Request Could not be made. Please try again later';
    }

    if (status === STATUS_FAILED) {
        const { message } = response.data.response;
        return message ? message : 'Request Could not be made. Please try again later'
    }

    return;
}

