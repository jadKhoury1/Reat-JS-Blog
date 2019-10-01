import _ from 'lodash';
import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import blog from '../../apis/blog';
import { checkForErrors } from '../../helpers/handleResponse';

const CHANGE_TITLE = 'change_title';
const CHANGE_DESCRIPTION = 'change_description';
const CHANGE_IMAGE = 'change_image';
const CHANGE_ERRORS = 'change_errors';
const CHANGE_SUCCESS = 'change_success';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_TITLE:
        return {...state, title: payload};
    case CHANGE_DESCRIPTION:
        return {...state, description: payload};
    case CHANGE_IMAGE:
        return {...state, image: payload, errors: {}};
    case CHANGE_ERRORS:
        return {...state, errors: payload};
    case CHANGE_SUCCESS:
        return {...state, success: payload, errors: {}}
    default:
        return state;
  }
}


/**
 * The Post Form is a functionial component that uses the useReducer in order to manage its state
 */
const PostForm = ({ button, handleSubmit, initialValues}) => {

    const [state, dispatch] = useReducer(reducer, {
        title: initialValues.title,
        description: initialValues.description,
        image: initialValues.image,
        errors: {},
        success: ''
    });

    const uploadImage = async event => {
        let uploadedImage = event.target.files[0];
        let fd = new FormData();
        fd.append('file', uploadedImage);

        const response = await blog().post('/image/upload', fd);
        const imageErrors = checkForErrors(response);

        if (imageErrors) {
            dispatch({ type: CHANGE_ERRORS, payload: { image: imageErrors }});
        } else {
            const { full_path, relative_path } = response.data.response;
            dispatch({type: CHANGE_IMAGE, payload: { fullPath: full_path, relativePath: relative_path}});
        }
        
    }

    const handleErrors = () => {
        let errors = {};

        if (state.title && state.title.length < 6) {
            errors.title = 'Title must be at least 6 characters';
        }
       
       if (!state.title) {
           errors.title = 'Title field is required';
       }

       if (!state.description) {
           errors.description = 'Description Field is required';
       }

        if (!state.image.fullPath) {
            errors.image = 'Image is required';
        }

        return errors;
    }

    const onSubmit = event => {
        event.preventDefault();
        const errors = handleErrors();
        if (Object.keys(errors).length !== 0) {
            dispatch({type: CHANGE_ERRORS, payload: errors});
        } else {
            
            handleSubmit(
                {..._.omit(state, ['errors']), image: state.image.relativePath},
                error => dispatch({type: CHANGE_ERRORS, payload: {api: error}}),
                success => {

                    dispatch({type: CHANGE_SUCCESS, payload: success});
                }
            );
        }
    }

    return (
        <div>
            <form className="ui form error success" onSubmit={onSubmit}>
                {state.success ? <div className="ui success message"> {state.success} </div> : null }
                {state.errors.api ? <div className="ui error message"> {state.errors.api} </div> : null }
                <div className="field">
                    <label>Title</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter Post Title"
                        value={state.title} 
                        onChange={e => dispatch({type: CHANGE_TITLE, payload: e.target.value})}
                    />
                    {state.errors.title ? <div className="ui error message"> {state.errors.title} </div> : null }
                </div>
                <div className="field">
                    <label>Description</label>
                    <textarea 
                        type="text" 
                        name="description" 
                        placeholder="Enter Post Description"
                        value={state.description}
                        onChange={e => dispatch({type: CHANGE_DESCRIPTION, payload: e.target.value})}
                    >
                    </textarea>
                    {state.errors.description ? <div className="ui error message"> {state.errors.description} </div> : null }
                </div>
                <div className="field">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={e => uploadImage(e)}
                    />
                    {state.errors.image ? <div className="ui error message"> {state.errors.image} </div> : null }
                </div>
                <img src={state.image.fullPath} className="ui small image"/>
                <div className="mg-t-20">
                    {!state.success ?<button className="ui primary button" type="submit">{button}</button>: null}
                    <Link to='/' className="ui button">Back</Link>
                </div>
            </form>
        </div>
        
    );
}

export default PostForm;