import React, { Component } from 'react';
import {Row, Col, FormGroup, Input, Label} from 'reactstrap';
import AuthService from '../services/AuthService';
import '../css/NewEvent.css';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv()

class NewEvent extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.state = {
      apiURL: env.REACT_APP_API_URL,
      errors: '',
      trip_id: '',
      form: {
        title: '',
        location: '',
        description: '',
        link: '',
        date: '',
        trip_id: ''
      }
    }
  }

  handleChange(e){
    e.preventDefault()
    const { form } = this.state
    form[e.target.name] = e.target.value
    form.user_id = this.Auth.getUserId()

    this.setState({ form })
  }

  newEventSubmit(event){
    //when a submission happens we are NOT sending a url with parameters, opting to send json state object instead
    event.preventDefault()
    //set new event to state
    const newEvent = this.state.form

    //use trip_id from localStorage to send with new event
    newEvent.trip_id = localStorage.getItem('trip_id')
    //send json version of new event to backend api with post method
    fetch(`${this.state.apiURL}/events`,
      {
        body: JSON.stringify(newEvent),
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
      } else { //(temporarily) set alert=success
        //todo redirect to login
        this.setState({errors: null})
        this.props.toggleNewEvent()
      }})
  }

  render(){
    return(
      <form
        id="form"
        className="form-submit"
        onSubmit={this.newEventSubmit.bind(this)}>

        <FormGroup row>
          <Col>
            <Input
              className="form-control title"
              type="text"
              placeholder="Title"
              name="title"
              value={this.state.form.title}
              onChange={this.handleChange.bind(this)}
              id="inputLarge"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col>
            <Input
                className="form-control"
                type="text"
                placeholder="Location"
                name="location"
                value={this.state.form.location}
                onChange={this.handleChange.bind(this)}
                id="inputLarge"
              />
          </Col>
        </FormGroup>

        <FormGroup row>
        <Label for="start_date" sm={4}>Start Date</Label>
        <Col sm={8}>
              <input
                className="form-control"
                type="datetime-local"
                name="date"
                value={this.state.form.date}
                onChange={this.handleChange.bind(this)}
                id="inputLarge"
              />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col>
          <Input
            type="textarea"
            id="exampleTextarea"
            rows="5"
            placeholder="Add a description of your proposed activity..."
            name="description"
            value={this.state.form.description}
            onChange={this.handleChange.bind(this)}/>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col>
          <Input
            type="textarea"
            id="exampleTextarea"
            rows="3"
            placeholder="Add links that pertain to your event here..."
            name="link"
            value={this.state.form.link}
            onChange={this.handleChange.bind(this)}/>
          </Col>
        </FormGroup>

        <Row>
        <button
          type="button"
          input type="submit"
          value='Submit'
          className="btn btn-lg btn-block form-submit new-event-btn">
              Submit
        </button>
        </Row>

      </form>
    )
  }
}

export default NewEvent;
