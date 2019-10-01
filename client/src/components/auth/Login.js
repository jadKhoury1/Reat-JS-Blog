import _ from 'lodash';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.handleErrors = this.handleErrors.bind(this);
    }
    

    handleSubmit = event => {
        event.preventDefault();
        const errors = this.handleErrors();

        if (Object.keys(errors).length !== 0) {
            this.setState({ errors });
        } else {
            this.props.signIn(
                _.omit(
                    {...this.state}, ['errors']
                ), error => this.setState({ errors: {api: error}})
            );
        }
    };

    handleErrors() {
        let errors = {};

        for (var input in this.state) {
            if (!this.state[input]) {
                errors[input] = `${input} field is required`;
            }
        }

        return errors;
    }

    handleInputChange = ({ target: { value, name} }) => {
        this.setState({
            [name]: value
        });
    }

    renderForm = () => {
        if (this.props.isSignedIn) {
            return <Redirect to="/" />
        }
        
        const { errors } = this.state;

        return (
            <form className="ui form error" onSubmit={this.handleSubmit}>
                {errors.api ? <div className="ui error message"> {errors.api} </div> : null }
                <div className="field">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter Your Email"
                        value={this.state.name} 
                        onChange={this.handleInputChange}
                    />
                    {errors.email ? <div className="ui error message"> {errors.email} </div> : null }
                </div>
                <div className="field">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password"
                        value={this.state.password} 
                        onChange={this.handleInputChange}
                    />
                    {errors.password ? <div className="ui error message"> {errors.password} </div> : null }
                </div>
                <button className="ui primary button" type="login">Login</button>
                <Link to='/' className="ui button">Back</Link>
            </form>
        );
    }

    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) =>{
    return {
        isSignedIn: auth.isSignedIn
    };
};

export default connect(mapStateToProps, { signIn })(Login);