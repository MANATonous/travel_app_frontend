import React, { Component } from 'react';
import '../css/App.css';
import Dashboard from './Dashboard';
import Trip from './Trip';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthService from '../services/AuthService'

const Auth = new AuthService()

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/Login' component={Login} />
            <Route path='/Trip/:id' component={Trip} />
            <Route path='/' component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
