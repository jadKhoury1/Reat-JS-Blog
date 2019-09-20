import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost} from '../../actions';
import PostForm from './PostForm';

class PostCreate extends Component {
    onSubmit = (formValues, errorCallback, successCallback) => {
        console.log('this was reached');
        this.props.createPost(formValues, errorCallback, successCallback);
    }

    render() {
        return (
            <div className="ui container">
                <h3 className="header">Add New Post</h3>
                <PostForm 
                    button="Add"
                    handleSubmit={this.onSubmit}
                    initialValues={{title:'', description: '', image: {}, errors: {}}}
                />
            </div>
        );
    }
}

export default connect(null, { createPost })(PostCreate);