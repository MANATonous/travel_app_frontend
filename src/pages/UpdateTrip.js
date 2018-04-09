import React, { Component } from 'react';
import {Row, Col, Form, Modal, ModalBody, ModalHeader, Collapse, ModalFooter, Button, FormGroup, Label, Input,Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink} from 'reactstrap';
import AuthService from '../services/AuthService'
import '../css/Trip.css';


class UpdateTrip extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      apiURL: 'http://localhost:3000',
      errors: '',
      form: {
        title: '',
        city: '',
        state: '',
        country: '',
        start_date: '',
        end_date: '',
        description: '',
        link: '',
        user_id: '',
        trip_id: '',
        photo_base: null
      },

      collapsed:true
    }
  }

  componentWillMount() {
    const tripID = localStorage.getItem('trip_id')
    const apiURL = this.state.apiURL

    fetch(`${apiURL}/find_trip/${tripID}.json`)
    .then((res) =>{
      return res.json()
    })
    .then((res) =>{
      const form = res[0]
      console.log(form.city);
      this.setState({
        form: {
          title: form.title,
          city: form.city,
          state: form.state,
          country: form.country,
          start_date: form.start_date,
          end_date: form.end_date,
          description: form.description,
          link: form.link,
          trip_id: tripID
        }
      });
    })
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
      formState.photo_base = fileString
      this.setState({form: formState})
    })
  }

  handleChange(e){
    const { form } = this.state
    form[e.target.name] = e.target.value
    form.user_id = this.Auth.getUserId()
    this.setState({ form })
  }


  updateTripSubmit(event) {
    //when a submission happens we are NOT sending a url with parameters, opting to send json state object instead
    event.preventDefault()
    //set new trip to state
    const updateTrip = this.state.form
    //send json version of new trip to backend api with post method
    fetch(`${this.state.apiURL}/trip`,
      {
        body: JSON.stringify(updateTrip),
        headers: {
          'Content-Type': 'application/json'
        },
        method: "PATCH"
      }
    )
    .then((res) => { //process response
      return res.json()
    })
    .then((res) => this.props.toggleEdit(res))
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render(){
    return(
      <div>
        <form onSubmit={this.updateTripSubmit.bind(this)} id="form">

          <FormGroup row>
            <Label for="title" hidden sm={2}>Title</Label>
            <Col>
              <Input type="text" name="title" id="inputLarge" placeholder="Title" value= {this.state.form.title} onChange={this.handleChange.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="city" hidden sm={2}>City</Label>
            <Col>
              <Input type="text" name="city" id="inputLarge" placeholder="City" value= {this.state.form.city} onChange={this.handleChange.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="state" hidden sm={2}>City</Label>
            <Col>
              <Input type="text" name="state" id="inputLarge" placeholder="State" value= {this.state.form.state} onChange={this.handleChange.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="country" hidden sm={2}>Country</Label>
            <Col>
              <Input type="text" name="country" id="inputLarge" placeholder="Country" value= {this.state.form.country} onChange={this.handleChange.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="start_date" sm={3}>Start Date</Label>
            <Col sm={6}>
              <Input type="date" name="start_date" id="inputLarge" placeholder="Start Date" value= {this.state.form.start_date} onChange={this.handleChange.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="end_date" sm={3}>End Date</Label>
            <Col sm={6}>
              <Input type="date" name="end_date" id="inputLarge" placeholder="End Date" value= {this.state.form.end_date} onChange={this.handleChange.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="description" > </Label>
            <Col>
              <Input type="textarea" rows="4" name="description" id="exampleTextarea" placeholder="Add ideas for your trip here! Events, Adventures, and Explorations!" value= {this.state.form.description} onChange={this.handleChange.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="link"> </Label>
            <Col>
              <Input type="textarea" rows="3" name="link" id="exampleTextarea" placeholder="Add links that pertain to your trip here..." value= {this.state.form.link} onChange={this.handleChange.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup Row>
            <Label for="photo_base" hidden sm={2}>Add a Trip Picture</Label>
            <Col>
              <input type="file" onChange={this.fileChangeHandler.bind(this)} />
            </Col>
          </FormGroup>

          <button
            type="button"
            input type="submit"
            value='Submit'
            className="btn btn-primary btn-lg btn-block update-button form-submit"
          >
            Submit
          </button>

        </form>
      </div>
    );
  }
}

export default UpdateTrip;
