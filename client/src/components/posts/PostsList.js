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
                        <React.Fragment>
                            <p className="ui green label  mg-r-15">{action.transaction}</p>
                            <Link to={`/post/${post.id}/action`} className="ui primary button">View More</Link>
                        </React.Fragment>
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

   renderPostList = () => {
        return this.props.posts.reverse().map(post => {
            if (post.deleted_at) {
                return;
            }
            return (
                <div className="item mg-b-20 border-b-grey pd-b-20" key={post.id}>
                    <div className="image">
                        <img src={post.image_path} />
                    </div>
                    <div className="content">
                        <h3 className="header">{post.title}</h3>
                        <div className="description">{post.description}</div>
                        <div className="extra">
                            {this.renderButton(post)}
                            {this.renderError(post.id)}
                        </div>
                    </div>
                </div>
            );
        });
   }

    render() {
        return (
            <div className="ui items">
                {this.renderPostList()}
            </div>
        );
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