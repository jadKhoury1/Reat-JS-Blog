import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';

class PostList extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return this.props.posts.map(post => {
            return (
                <div className="item" key={post.id}>
                    <div className="content">
                        <h3 className="header">{post.title}</h3>
                        <div className="description">{post.description}</div>
                    </div>
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

export default connect(mapStateToProps, { fetchPosts })(PostList);