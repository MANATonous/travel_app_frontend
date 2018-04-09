import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import Register from './Register'
import { Button, Col, Form, FormGroup, Label,Input, Row, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../css/Login.css';
import '../css/Register.css';


class Login extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.state = {
      email: '',
      password: '',
      apiUrl: 'http://localhost:3000',
      modal: false,
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  //update state based on user input in form
  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value })
  }

  userCredSubmit(e){
    e.preventDefault()
    this.Auth.login(this.state.email,this.state.password)
    .then(res =>{
      this.props.history.replace('/')
    })
    .catch(err =>{ alert(err) })
  }

  render() {
    return (
      <div className="admin-page-background">
        <div className="info-text">
          <div className="card-body">
            <h2 className="login-h2">{"Welcome to Trippin' Out!"}</h2>
            <div className="text-description">
              <p className="card-text">{"If you've ever tried to plan a trip with multiple people, you know it can be difficult to keep all your ideas in one place. Our app makes it easy to organize all your thoughts and resources in one place."}</p>
              <br/>
              <p className="card-text">{"Once you add a trip to your dashboard, you'll easily be able to invite friends and family to your vacation or event. Everyone will be able to contribute ideas and stay connected through messaging and event itineraries."}</p>
            </div>
          </div>
        </div>
        <div className="loginform">
          <form onSubmit={this.userCredSubmit.bind(this)}>
            <FormGroup row>
              <Label for="email" hidden sm={3}>Email</Label>
              <Col sm={5}>
                <Input className= "form-item" type="email" name="email" id="email" placeholder="Email" value= {this.state.email}
                onChange={this.handleChange.bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" hidden sm={3}>Password</Label>
              <Col sm={5}>
                <Input className= "form-item" type="password" name="password" id="password" placeholder="Password" value= {this.state.password}
                onChange={this.handleChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="loginbutton"></Label>
              <Col>
                <input
                  type="submit"
                  value="Log In"
                  name="submit"
                  className="login btn btn-lg form-submit"
                />
              </Col>
            </FormGroup>
            <Button id="registerbutton" className="btn btn-lg form-submit" onClick={this.toggle}> Register </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>{"Start Trippin' Out!"}</ModalHeader>
              <ModalBody>
                <Register toggleModal={this.toggle}/>
              </ModalBody>
            </Modal>
          </form>
        </div>
      </div>
      );
    }
  }

export default Login
