import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { authenticate } from '../actions';
import Header from './Header';
import PostsList from './posts/PostsList'
import PostCreate from './posts/PostCreate';
import PostEdit from './posts/PostEdit';
import PostDelete from './posts/PostDelete';
import PostShow from './posts/PostShow';
import Login from './auth/Login';
import Register from './auth/Register';
import history from '../history';



class App  extends Component {
    componentDidMount() {
        const user = localStorage.getItem('auth_user');
        if (user) {
            this.props.authenticate(JSON.parse(user));
        }
    }

    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route path='/' exact component={PostsList} />
                            <Route path='/post/new' component={PostCreate} />
                            <Route path='/post/edit/:id' component={PostEdit} />
                            <Route path='/post/delete/:id' component={PostDelete} />
                            <Route path='/post' component={PostShow} />
                            <Route path='/auth/login' component={Login} />
                            <Route path='/auth/register' component={Register} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
    
}

export default connect(null, { authenticate })(App);