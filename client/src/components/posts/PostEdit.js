import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, editPost } from '../../actions';
import PostForm from './PostForm';


class PostEdit extends Component {

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    onSubmit =  (formValues, errorCallback, successCallback) => {
        this.props.editPost(this.props.match.params.id, formValues, errorCallback, successCallback);
    }

    render() {
        if (!this.props.post) {
            return <div>Loading...</div>;
        }

        return (
            <div className="ui container">
                <h3 className="header">Edit Post</h3>
                <PostForm
                    button="Edit"
                    handleSubmit={this.onSubmit}
                    initialValues={
                        {
                            ..._.pick(this.props.post, 'title', 'description'),
                            image: { relativePath: this.props.post.image, fullPath: this.props.post.image_path}
                        }
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { post: state.posts.find(({id}) => id === parseInt(ownProps.match.params.id))}
};

export default connect(mapStateToProps, { fetchPost, editPost })(PostEdit);