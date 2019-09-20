import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, rejectPostAction, approvePostAction } from '../../actions/index';
import {  EDIT_ACTION } from '../../actions/types';



class PostAction extends Component {
    
    state = {
        error: '',
        success: ''
    };

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    renderActionForm = post => {
        return (
            <form className="ui form">
                <div className="field">
                    <label>Title</label>
                    <input disabled type="text" value={post.title} />
                </div>
                <div className="field">
                    <label>Desciption</label>
                    <input disabled type="text" value={post.description} />
                </div>
            </form>
        );
    }

    renderForm = () => {
        const { post } = this.props;
        return (
            <div>
                {
                    post.action === EDIT_ACTION ? 
                    <div>
                        <h3>Old Post</h3>
                        {this.renderActionForm(post)}
                        <h3>New Post</h3>
                        {this.renderActionForm(JSON.parse(post.action.data))}
                    </div> : this.renderActionForm(post)
                }   
            </div>
        );
        
    }

    renderActionHeader = () => {
        const { post } = this.props;
    
        if (!post.action) {
            return null;
        }

        return (
            <React.Fragment>
                <h3>{post.action.transaction}</h3>
                {this.renderActionUserInfo(post.action)}
            </React.Fragment>
            
        );
    }


    renderActionUserInfo = ({user}) => {
        if (!user) {
            return null;
        }

        return (
            <div>
                <span><strong>User Id:</strong> {user.id}</span>
                <span><strong>User Name: </strong>{user.name}</span>
                <span><strong>User Email: </strong>{user.email}</span>

            </div>
        );
    }

    renderButtons = () => {
        const { post, user } = this.props;

        if (!post.action || !user || user.role_key !== 'admin') {
            return null;
        }

        return (
            <div>
                <button 
                    className="ui primary button"
                    onClick={() => this.props.approvePostAction(
                        post.action.id,
                        post.action.action,
                        error => this.setState({ error }),
                        success => this.setState({ success })
                    )}
                >
                    Approve
                </button>

                <button 
                    className="ui red button"
                    onClick={() => this.props.rejectPostAction(
                        post.action.id,
                        post.action.action,
                        error => this.setState({ error }),
                        success => this.setState({ success })
                    )}
                >
                    Reject
                </button>
            </div>
        )

    };


    render() {
        if (!this.props.post && this.state.success) {
            return <h3>{this.state.success}</h3>;
        }

        if (!this.props.post) {
            return <div>Loading...</div>;
        }

        if (this.props.post.deleted_at) {
            return <h3>Post Deleted</h3>
        }
     
        return (
            <div className="ui container">
               {this.state.success ? <h3>{this.state.success}</h3> : ''}
               {this.state.error ? <h3 className="red">{this.state.error}</h3> : ''}
               {this.renderActionHeader()}
               {this.renderForm()}
               {this.renderButtons()}
            </div>
        );
    }
}

const mapStateToProps = ({ posts, auth}, ownProps)  => {
    return {
        user: auth.user,
        post: posts[parseInt(ownProps.match.params.id)]   
    };
};

export default connect(mapStateToProps, { fetchPost, rejectPostAction,  approvePostAction })(PostAction);



