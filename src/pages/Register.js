import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap'
import '../css/Register.css';


class Register extends Component {
    constructor(props){
      super(props)
      this.state = {
        apiURL: 'http://localhost:3000',
        errors: '',
        // state gets updated from handleChange, and sent to server with newUserSubmit
        form: {
          first_name: '',
          last_name: '',
          city: '',
          state: '',
          email: '',
          password: '',
          password_confirmation: '',
          avatar_base: null
        }
      }
    }

    //base64 encode the file
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

    // custom handler for file uploads
    fileChangeHandler(event){
      const file = event.target.files[0]
      this.getBase64(file).then( (fileString) => {
        const formState = Object.assign({}, this.state.form)
        formState.avatar_base = fileString
        this.setState({form: formState})
      })
    }

//handleChange is called any time a user inputs any value into a form field, when they do so the corresponding state.from field is updated
handleChange(e){
  const formState = Object.assign({}, this.state.form)
  formState[e.target.name] = e.target.value
  this.setState({form: formState})
}

newUserSubmit(event){
  //when a submission happens we are NOT sending a url with parameters, opting to send json state object instead
  event.preventDefault()
  //set newUser to state
  const newUser = this.state.form
  //send json version of newUser to backend api with post method
  fetch(`${this.state.apiURL}/users`,
    {
      body: JSON.stringify(newUser),
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
      this.props.toggleModal()
    }})
}
    render() {
      return (
      <div>
      <form className="register_form">
          <FormGroup>
              <Input type="text" name="first_name" id="first_name_test" placeholder="First Name" value= {this.state.form.first_name}
              onChange={this.handleChange.bind(this)}/>
          </FormGroup>
          <FormGroup>
              <Input type="text" name="last_name" id="last_name" placeholder="Last Name" value= {this.state.form.last_name}
              onChange={this.handleChange.bind(this)}/>
          </FormGroup>
          <FormGroup>
              <Input type="text" name="city" id="city" placeholder="City" value= {this.state.form.city}
              onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup>
              <Input type="text" name="state" id="state" placeholder="State" value= {this.state.form.state}
              onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup>
              <Input type="email" name="email" id="email" placeholder="Email" value= {this.state.form.email}
              onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup>
              <Input type="password" name="password" id="password" placeholder="Password" value= {this.state.form.password}
              onChange={this.handleChange.bind(this)}/>
          </FormGroup>
          <FormGroup>
              <Input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" value= {this.state.form.password_confirmation}
              onChange={this.handleChange.bind(this)}/>
          </FormGroup>
          <FormGroup>
            <h6>Upload a Profile Picture</h6>
          </FormGroup>
          <FormGroup>
                <Input
                  type="file"
                  onChange={this.fileChangeHandler.bind(this)}
                />
          </FormGroup>
          <button
            type="button"
            input type="submit"
            value='Submit'
            onClick={this.newUserSubmit.bind(this)}
            className="btn btn-lg btn-block form-submit registerbutton"
          >
            Submit
          </button>
        </form>
      </div>
        );
      }
    }

export default Register;

//
// import { Navbar, Nav, NavDropdown, modal, Card, CardImg, CardDeck, CardText, CardBody, CardTitle, CardSubtitle, Button, Col, Form, FormGroup, Label,Input, Row} from 'reactstrap'
// import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
