import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions';
import PostForm from './PostForm';
import { checkForErrors } from '../../helpers/handleResponse';
import blog from '../../apis/blog';
import history from '../../history';


class PostEdit extends Component {

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    onSubmit = async (formValues, callback) => {
        const response = await blog().put(`/post/edit/${this.props.match.params.id}`, formValues);
        const errors = checkForErrors(response);

        if (errors) {
            if (errors === 'Unauthenticated') {
                history.push('/auth/login');
            } else {
                callback(errors);
            }
        } else {
            history.push('/');
        }
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
                    initialValues={_.pick(this.props.post, 'title', 'description', 'image')}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { post: state.posts[parseInt(ownProps.match.params.id)]}
};

export default connect(mapStateToProps, { fetchPost })(PostEdit);