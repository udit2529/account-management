import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import UserLogin from './Userlogin';
import './Login.css';
import CheckPage from './CheckPage';
import UserDashboard from './UserDashboard';
import AdminDash from './AdminDash';


ReactDOM.render(
    <BrowserRouter>
     {/* <UserDashboard/> */}
        <Switch>
            
            <Route exact path='/' component={CheckPage} />
            <Route exact path='/log' component={Login} />
            {/* //<Route exact path='/register' component={Register} /> */}
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/userlogin' component={UserLogin} />
            <Route exact path='/userdashboard' component={UserDashboard} />
            <Route exact path="/admindash" component={AdminDash}/>
             
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);