import React, { Component } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import AuthService from '../services/AuthService'
import '../css/NewTrip.css';

class NewTrip extends Component {
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
        photo_base: null,
        collapsed:true
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


  newTripSubmit(event){
    //when a submission happens we are NOT sending a url with parameters, opting to send json state object instead
    event.preventDefault()
    //set new trip to state
    const newTrip = this.state.form
    //send json version of new trip to backend api with post method
    fetch(`${this.state.apiURL}/trips`,
      {
        body: JSON.stringify(newTrip),
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
        this.props.toggleNewTrip()
      }})
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render(){
    return(
      <div>
          <form
            onSubmit={this.newTripSubmit.bind(this)} id="form">
            <FormGroup row>
              <Col>
                <Input type="text" name="title" id="inputLarge" placeholder="Title" value= {this.state.form.title}
                onChange={this.handleChange.bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Input type="text" name="city" id="inputLarge" placeholder="City" value= {this.state.form.city}
                onChange={this.handleChange.bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Input type="text" name="state" id="inputLarge" placeholder="State" value= {this.state.form.state}
                onChange={this.handleChange.bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Input type="text" name="country" id="inputLarge" placeholder="Country" value= {this.state.form.country}
                onChange={this.handleChange.bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="start_date" sm={4}>Start Date</Label>
              <Col sm={8}>
                <Input type="date" name="start_date" id="inputLarge" placeholder="Start Date" value= {this.state.form.start_date}
                onChange={this.handleChange.bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="end_date" sm={4}>End Date</Label>
              <Col sm={8}>
                <Input type="date" name="end_date" id="inputLarge" placeholder="End Date" value= {this.state.form.end_date}
                onChange={this.handleChange.bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" > </Label>
              <Col>
                <Input type="textarea" rows="4" name="description" id="exampleTextarea" placeholder="Trip Description: Events, Adventures, and Explorations!" value= {this.state.form.description}
                onChange={this.handleChange.bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="link"> </Label>
              <Col>
                <Input type="textarea" rows="3" name="link" id="exampleTextarea" placeholder="Add links that pertain to your trip here..." value= {this.state.form.link}
                onChange={this.handleChange.bind(this)}/>
              </Col>
              </FormGroup>
              <FormGroup>
                <h6>Upload a Picture for Your Trip</h6>
              </FormGroup>
              <FormGroup row>
                <Label for="photo_base" hidden sm={2}>Add a Trip Picture</Label>
                <Col>
                  <input type="file" onChange={this.fileChangeHandler.bind(this)} />
                </Col>
            </FormGroup>
            <button
              type="button"
              input type="submit"
              value='Submit'
              className="btn btn-lg btn-block form-submit new-trip-btn">
                  Submit
            </button>
          </form>
      </div>
    );
  }
}

export default NewTrip;
