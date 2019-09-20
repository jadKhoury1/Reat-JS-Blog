import _ from 'lodash';
import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

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
        return {...state, image: payload};
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


    const handleErrors = () => {
        let errors = {};

        if (state.title && state.title.length < 6) {
            errors.title = 'Title must be at least 6 characters';
        }
        if (!state.title) {
            errors.title = 'Title is required';
        }

        if (!state.description) {
            errors.description = 'Description is required';
        }

        return errors;
    }

    const onSubmit = event => {
        event.preventDefault();
        const errors = handleErrors();
        if (Object.keys(errors).length !== 0) {
            dispatch({type: CHANGE_ERRORS, payload: errors});
        } else {
            let dataToOmmit = ['errors'];
            if (!state.image) {
                dataToOmmit.push('image')
            }
            handleSubmit(
                _.omit(state, dataToOmmit),
                error => dispatch({type: CHANGE_ERRORS, payload: {api: error}}),
                success => {
                    console.log('success was reached', success);
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
                    <input 
                        type="text" 
                        name="description" 
                        placeholder="Enter Post Description"
                        value={state.description} 
                        onChange={e => dispatch({type: CHANGE_DESCRIPTION, payload: e.target.value})}
                    />
                    {state.errors.description ? <div className="ui error message"> {state.errors.description} </div> : null }
                </div>
                {!state.success ?<button className="ui primary button" type="submit">{button}</button>: null}
                <Link to='/' className="ui button">Back</Link>
            </form>
        </div>
        
    );
}

export default PostForm;