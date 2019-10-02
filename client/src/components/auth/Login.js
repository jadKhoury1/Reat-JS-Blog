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
        const inputs = _.omit({...this.state}, ['errors', 'apiCall']);
        const errors = this.handleErrors(inputs);
        if (Object.keys(errors).length !== 0) {
            this.setState({ errors });
        } else {
            this.setState({apiCall: true});
            this.props.signIn(
               inputs, error => this.setState({ errors: {api: error}, apiCall: false})
            );
        }
    };

    handleErrors(inputs) {
        let errors = {};

        for (var input in inputs) {
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

    renderButtons = () => {
        if (this.state.apiCall) {
            return <button className="ui primary loading button">Loading</button>;
        }
        return (
            <React.Fragment>
                <button className="ui primary button" type="login">Login</button>
                <Link to='/' className="ui button">Back</Link>
            </React.Fragment>
        );
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
                {this.renderButtons()}
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