import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, rejectPostAction, approvePostAction } from '../../actions/index';
import {  EDIT_ACTION } from '../../actions/types';
import { Link } from 'react-router-dom';



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
            <div className="mg-t-20">
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
                <h3 className="red-color">{post.action.transaction}</h3>
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
                <p><span className="ui orange label">User Id:</span> <strong>{user.id} </strong></p>
                <p><span className="ui yellow label">User Name: </span> <strong>{user.name}</strong></p>
                <p><span className="ui olive label">User Email</span><strong>{user.email}</strong></p>

            </div>
        );
    }

    renderButtons = () => {
        const { post, user } = this.props;

        if (!post.action || !user || user.role_key !== 'admin') {
            return null;
        }

        return (
           <React.Fragment>
                <button 
                    className="ui primary button"
                    onClick={() => this.props.approvePostAction(
                        post.action.id,
                        post.action.action,
                        error => this.setState({ error }),
                        success => this.setState({ success, error: '' })
                    )}
                >
                    Approve
                </button>

                <button 
                    className="ui red button mg-l-15"
                    onClick={() => this.props.rejectPostAction(
                        post.action.id,
                        post.action.action,
                        error => this.setState({ error }),
                        success => this.setState({ success })
                    )}
                >
                    Reject
                </button>
            </React.Fragment>
        
        )

    };


    render() {
        if (!this.props.post && this.state.success) {
            return(
                <div className="ui success">
                    <h3 className="ui success message">{this.state.success}</h3>
                </div>
            );
        }

        if (!this.props.post) {
            return <div>Loading...</div>;
        }

        if (this.props.post.deleted_at) {
            return (
                <div className="ui error">
                    <h3 className="ui error message">Post Deleted</h3>
                </div>
            );
        }
     
        return (
            <div className="ui container error success">
               {this.state.success ? <h3 className="ui success message">{this.state.success}</h3> : ''}
               {this.state.error ? <h3 className="ui error message">{this.state.error}</h3> : ''}
               {this.renderActionHeader()}
               {this.renderForm()}
               <div className="mg-t-20">
                {this.renderButtons()}
                <Link to='/' className="ui button mg-l-15">Back</Link>
               </div>
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



