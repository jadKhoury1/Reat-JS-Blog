import blog from '../apis/blog';
import history from '../history';

import { 
    REGISTER, SIGN_IN, SIGN_OUT, 
    FETCH_POSTS, FETCH_POST, CREATE_POST,
    EDIT_POST, DELETE_POST
} from './types';


export const register = data => async dispatch => {
    const response = await blog.post('/register', data);
    dispatch({ type: REGISTER, payload: response.data });
    history.push('/');
};

export const signIn = data => async dispatch => {
    const response = await blog.post('/login', data);
    dispatch({ type: SIGN_IN, payload: response.data });
    history.push('/');
}

export const signOut = () => async dispatch => {
    const response = await blog.post('/logout');
    dispatch({ type: SIGN_OUT, payload: response.data });
} 

export const fetchPosts = () => async dispatch => {
    console.log('Fetch Posts reached');
    const response = await blog.get('/posts/get');
    console.log('response:', response);
    dispatch({ type: FETCH_POSTS, payload: response.data.response.posts });
};

export const fetchPost = id => async dispatch => {
    const response = await blog.get(`/post/get/${id}`);
    dispatch({ type: FETCH_POST, payload: response.data });
}

export const createPost = data => async dispatch => {
    const response = await blog.post('/post/add', data);
    dispatch({ type: CREATE_POST, payload: response.data });
    history.push('/');
}

export const editPost = (id, data) => async dispatch => {
    const response = await blog.put(`/post/edit/${id}`, data);
    dispatch({ type: EDIT_POST, payload: response.data });
}

export const deletePost = id => async dispatch => {
    const response = await blog.delete(`/post/delete/${id}`);
    dispatch({ type: DELETE_POST, payload: response.data });
}

