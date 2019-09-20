import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, delePost } from '../../actions';


class PostList extends Component {

    state = {
        errors: {}
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    UNSAFE_componentWillReceiveProps({ history: {location: {state}} }) {
        if (state && state.refresh) {
            state.refresh = false;
            this.props.fetchPosts();
        }

   }

   deletePost =  postId => {
        this.props.delePost(postId, error => {
            let errorToReturn = {};
            errorToReturn[postId] = error;
            this.setState({ errors: errorToReturn })
        });
   }

   renderButton = post => {
       if(this.props.user) {
            if ((this.props.user.id === post.user_id || this.props.user.role_key === 'admin')) { 
                const { action } = post;
                if (action) {
                    return (
                        <div>
                            <p>{action.transaction}</p>
                            <Link to={`/post/${post.id}/action`} className="ui primary button">View More</Link>
                        </div>
                    );
                } 
                return (
                    <React.Fragment>
                        <Link to={`/post/edit/${post.id}`} className="ui primary button">Edit</Link>
                        <Link to="#" className="ui button" onClick={() => this.deletePost(post.id)} >Delete</Link>
                    </React.Fragment>
                );
            }
        }

        return null;
   }

   renderError = postId => {
        return <p>{this.state.errors[postId]}</p>
   }

    render() {
        return this.props.posts.reverse().map(post => {
            
            if (post.deleted_at) {
                return;
            }
            return (
                <div className="item" key={post.id}>
                    <div className="content">
                        <h3 className="header">{post.title}</h3>
                        <div className="description">{post.description}</div>
                    </div>
                    {this.renderButton(post)}
                    {this.renderError(post.id)}
                </div>
            );
        });
    }
}

// map state to props will be passed as callback function to connect method
// connect method will call mapStateToProps with the application state param
const mapStateToProps = ({ posts, auth }) => {
    return {
        posts: Object.values(posts),
        token: auth.token,
        user: auth.user,
        isSignedIn: auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchPosts, delePost })(PostList);