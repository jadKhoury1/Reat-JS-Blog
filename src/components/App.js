import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PostsList from './posts/PostsList'
import PostCreate from './posts/PostCreate';
import PostEdit from './posts/PostEdit';
import PostDelete from './posts/PostDelete';
import PostShow from './posts/PostShow';
import Login from './auth/Login';
import Register from './auth/Register';
import history from '../history';



const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path='/' exact component={PostsList} />
                        <Route path='/post/new' component={PostCreate} />
                        <Route path='/post/edit/:id' component={PostEdit} />
                        <Route path='/post/delete/:id' component={PostDelete} />
                        <Route path='/post' component={PostShow} />\
                        <Route path='/auth/login' component={Login} />
                        <Route path='/auth/register' component={Register} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;