import React, { Component } from 'react';
import {Row, Col, Form, FormGroup, Label, Button, Input} from 'reactstrap';
import AuthService from '../services/AuthService';
import '../css/JoinTrip.css';

class JoinTrip extends Component {
  constructor(props){
    super(props)
    this.Auth = new AuthService()
    this.state = {
      apiUrl: 'http://localhost:3000',
      info: {
        code: '',
        user_id: ''
      }
    }
  }

  handleChange(e){
    const { info } = this.state
    info[e.target.name] = e.target.value
    info.user_id = this.Auth.getUserId()
    this.setState({ info })
  }

  joinTripSubmit(event){
    //when a submission happens we are NOT sending a url with parameters, opting to send json state object instead
    event.preventDefault()
    //set newUser to state
    const joinTrip = this.state.info
    //send json version of newUser to backend api with post method
    fetch(`${this.state.apiUrl}/join_trip`,
      {
        body: JSON.stringify(joinTrip),
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST"
      }
    )
    .then((rawResponse) => { //process response
      return Promise.all([rawResponse.status, rawResponse.json()])
    })
    .then((parsedResponse) =>{ //if response is error, update this.state.error
      if (parsedResponse[0] === 422) {
        this.setState({errors: 'Invalid Inputs'})
      } else { //otherwise redirect to login and (temporarily) set alert=success
        //todo redirect to login
        this.setState({errors: null})
        //TODO redirect to trips dashboard
        this.props.toggleJoinTrip()
      }})
  }

  render(){
    return(
      <Form onSubmit={this.joinTripSubmit.bind(this)}>
        <FormGroup row>
          <Input type="text" name="code" id="InputLarge" placeholder="Code" value= {this.state.info.code}
           onChange={this.handleChange.bind(this)}/>
        </FormGroup>
        <FormGroup row>
            <input type="submit" className="btn join-trip-button submit" value="Join Trip"  />
        </FormGroup>
      </Form>
    )
  }
}

export default JoinTrip;
