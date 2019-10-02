import '../css/general.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions';

class Header extends Component {

    state = {
        apiCall: false
    }

    renderButtons = () => {
        if (this.props.isSignedIn) {
            return (
                <React.Fragment>
                    <Link to="/post/new" className="item">Add Post</Link>
                    <Link to="#" className="item" onClick={() => {
                        this.setState({apiCall: true});
                        this.props.signOut(() => this.setState({apiCall: false})) 
                    }}>
                        Logout
                    </Link>
                </React.Fragment>
            )
        }
        
        return(
            <React.Fragment>
                <Link to="/auth/register" className="item">Register</Link>
                <Link to="/auth/login" className="item">Login</Link>
            </React.Fragment>
        );
        
    };

    renderLoader = () => {
        if (this.state.apiCall) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">
                        Logging you out
                    </div>
                </div>
            );
        }

        return null;
    }

    render() {
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">Home</Link>
                <div className="right menu">
                    {this.renderButtons()}
                </div>
                {this.renderLoader()}
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user,
        isSignedIn: auth.isSignedIn
    }
};

export default connect(mapStateToProps, { signOut })(Header);