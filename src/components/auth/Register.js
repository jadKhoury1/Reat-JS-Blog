import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { registerAcion } from '../../actions';

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {}
        };
        this.handleErrors = this.handleErrors.bind(this);
        
    }
    
    handleInputChange = ({ target: { value, name} }) => {
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.handleErrors();

        if (Object.keys(errors).length !== 0) {
            this.setState({ errors });
        } else {
            this.props.registerAcion(
                _.omit(
                    {...this.state, password_confirmation: this.state.passwordConfirmation},
                     ['errors', 'passwordConfirmation']
                ), error => this.setState({ errors: {api: error}})
            );
        }
    }

    handleErrors() {
        let errors = {};

        if (this.state.name.length < 6) {
            errors.name = 'Name must be minimum 6 characters long';
        }

        if (this.state.name.length > 40) {
            errors.name = 'Name cannot exceed 40 characters';
        }
        
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(this.state.email)) {
            errors.email = 'Email is invalid';
        }

        re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,60}$/;

        if (!re.test(this.state.password)) {
            errors.password = 'Password must at least contain one small letter, one big letter ,one digit and one special character'
        }

        if (this.state.password !== this.state.passwordConfirmation) {
            errors.passwordConfirmation = 'Password does not match';
        }

        for (let input in this.state) {
            if (!this.state[input]) {
                errors[input] = `${input} field is required`;
            }
        }
        
        return errors;
    }

    renderHeader = () => {
        if (this.props.isSignedIn) {
            return <Redirect to="/" />
        }
        
        const { errors } = this.state;
        return (
            <form className="ui form error" onSubmit={this.handleSubmit.bind(this)}>
                <div className="field">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter Your name"
                        value={this.state.name} 
                        onChange={this.handleInputChange}
                    />
                    {errors.name ? <div className="ui error message"> {errors.name} </div> : null }
                   
                </div>
               
                <div className="field">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder= "Enter your email"
                        value={this.state.email} 
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
                <div className="field">
                    <label>Password Confirmation</label>
                    <input 
                        type="password" 
                        name="passwordConfirmation" 
                        placeholder="Enter Password Confirmation"
                        value={this.state.passwordConfirmation} 
                        onChange={this.handleInputChange}
                    />
                    {errors.passwordConfirmation ? <div className="ui error message"> {errors.passwordConfirmation} </div> : null }
                </div>
                {errors.api ? <div className="ui error message"> {errors.api} </div> : null }
                <button className="ui primary button" type="submit">Register</button>
                <Link to='/' className="ui button">Back</Link>
            </form>
        );
    }

    render() {
        return(
            <div>
                {this.renderHeader()}
            </div>
        );
    };
}

const mapStateToProps = ({ auth }) =>{
    return {
        isSignedIn: auth.isSignedIn
    };
};

export default connect(mapStateToProps, { registerAcion })(Register);