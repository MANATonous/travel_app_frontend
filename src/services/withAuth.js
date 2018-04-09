import React, { Component } from 'react'
import AuthService from '../services/AuthService'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

export default function withAuth(WrappedComponent) {
  const Auth = new AuthService()
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        userId: null
      }
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login')
      }
      else {
        try {
          const userId = Auth.getUserId()
          this.setState({
            userId: userId
          })
        }
        catch(err){
          Auth.logout()
          this.props.history.replace('/login')
        }
      }
    }

    render() {
      if (this.state.userId) {
        return (
          <WrappedComponent history={this.props.history} userId={this.state.userId} trip_id={this.props.match.params.id} />
        )
      }
      else {
        return null
      }
    }
  }
}
