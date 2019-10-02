import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, rejectPostAction, approvePostAction } from '../../actions/index';
import {  EDIT_ACTION } from '../../actions/types';
import { Link } from 'react-router-dom';



class PostAction extends Component {
    
    state = {
        error: '',
        success: '',
        apiCall: {approve: false, reject: false}
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
                    <textarea disabled value={post.description}> </textarea>
                </div>
                <img src={post.image_path} alt="blog" className="ui small image"/>
            </form>
        );
    }

    renderForm = () => {
        const { post } = this.props;
        return (
            <div className="mg-t-20">
           
                {
                    post.action && post.action.action === EDIT_ACTION ? 
                    <div className="ui grid">
                        <div className="eight wide column">
                            <h3>Old Post</h3>
                            {this.renderActionForm(post)}
                        </div>
                        <div className="eight wide column">
                            <h3>New Post</h3>
                            {this.renderActionForm(JSON.parse(post.action.data))}
                        </div>  
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
                <span className="ui orange label">User Id:</span> <strong>{user.id} </strong>
                <span className="ui yellow label mg-l-15">User Name: </span> <strong>{user.name}</strong>
                <span className="ui olive label mg-l-15">User Email</span><strong>{user.email}</strong>

            </div>
        );
    }

    approveAction = post => {
        this.setState({apiCall: { approve: true }});
        this.props.approvePostAction(
            post.action.id,
            post.action.action,
            error => this.setState({ error }),
            success => this.setState({ success, error: '' })
        );
    }

    rejectAction = post => {
        this.setState({apiCall: { reject: true }});
        this.props.rejectPostAction(
            post.action.id,
            post.action.action,
            error => this.setState({ error, apiCall: { approve: false, reject: false }}),
            success => this.setState({ success, apiCall: { approve: false, reject: false }})
        );
    }
    

    renderButtons = () => {
        const { post, user } = this.props;

        if (!post.action || !user || user.role_key !== 'admin') {
            return <Link to='/' className="ui button mg-l-15">Back</Link>;
        }

        if (this.state.apiCall.approve) {
            return <button className="ui primary loading button">Loading</button>;
        }

        if (this.state.apiCall.reject) {
            return <button className="ui red loading button">Loading</button>;
        }

        return (
           <React.Fragment>
                <button 
                    className="ui primary button"
                    onClick={() => this.approveAction(post)}
                >
                    Approve
                </button>

                <button 
                    className="ui red button mg-l-15"
                    onClick={() => this.rejectAction(post)}
                >
                    Reject
                </button>
                <Link to='/' className="ui button mg-l-15">Back</Link>
            </React.Fragment>
        )

    }


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
               <div className="mg-t-20 mg-b-20">
                    {this.renderButtons()}
               </div>
            </div>
        );
    }
}

const mapStateToProps = ({ posts, auth}, ownProps)  => {
    return {
        user: auth.user,
        post: posts.find(({id}) => id === parseInt(ownProps.match.params.id))
    };
};

export default connect(mapStateToProps, { fetchPost, rejectPostAction,  approvePostAction })(PostAction);



