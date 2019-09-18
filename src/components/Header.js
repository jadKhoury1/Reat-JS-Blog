import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions';

class Header extends Component {

    renderButtons = () => {
        if (this.props.isSignedIn) {
            return <Link to='#' className="item" onClick={() => this.props.signOut() }>Logout</Link>
        }
        
        return(
            <React.Fragment>
                <Link to="/auth/register" className="item">Register</Link>
                <Link to="/auth/login" className="item">Login</Link>
            </React.Fragment>
        );
        
    };

    render() {
        return (
            <div className="ui secondary pointing menu">
                <div className="right menu">
                    {this.renderButtons()}
                </div>
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