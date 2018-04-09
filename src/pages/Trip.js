import React, { Component } from 'react';
import MessageBoard from './MessageBoard';
import Itinerary from './Itinerary';
import NewEvent from './NewEvent'
import withAuth from '../services/withAuth'
import { Button, Jumbotron } from 'react-bootstrap';
import Navigation from './Navigation';
import TicketmasterAPI from './TicketmasterAPI';
import { Col, Form, FormGroup, Label, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import UpdateTrip from './UpdateTrip';
import AuthService from '../services/AuthService';
import '../css/Trip.css';


const apiURL = 'http://localhost:3000'

class Trip extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.state = {
      trip: {},
      model_new_event: false,
      modal_edit: false
    }
    this.toggleNewEvent = this.toggleNewEvent.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleModalEdit = this.toggleModalEdit.bind(this)
  }

  toggleNewEvent() {
    this.setState({modal_new_event: !this.state.modal_new_event})
  }

  toggleEdit(res) {
    this.setState({
      trip: res,
      modal_edit: !this.state.modal_edit
    });
  }

  toggleModalEdit() {
    this.setState({
      modal_edit: !this.state.modal_edit
    });
  }


  componentWillMount() {
    // When the component mounts we want see if an object exists in local storage, if yes, load the object,
    //if not pull it from props.match.params.id and save it to local storage
    const tripID = this.props.trip_id
    localStorage.setItem('trip_id', tripID)

    fetch(`${apiURL}/find_trip/${tripID}.json`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      this.setState({trip: parsedResponse[0]})
    })
  }

  renderAPI(){
    if (this.state.trip.city != undefined) {
      localStorage.setItem("city", this.state.trip.city)
      return (
          <TicketmasterAPI />

      )
    }
  }

  renderEditButton(){
    if (this.state.trip.user_id == this.Auth.getUserId()) {
      return (
        <div id="outer-submit">
          <Button type="button" id="edit-button" onClick={this.toggleModalEdit} > </Button>
        </div>
      )
    }
  }

  render() {
    return(
      <div>

        <Navigation />

        <div className="wrapper">

            <div className="tripinfo">
              <div className="trip-header">
                <h2 id="trip-title">{this.state.trip.title}</h2>

                {this.renderEditButton()}
                <Modal isOpen={this.state.modal_edit} toggle={this.toggleModalEdit}>
                  <ModalHeader toggle={this.toggleModalEdit}>Update Your Trip</ModalHeader>
                  <ModalBody id="toggleEdit">
                    <UpdateTrip toggleEdit={this.toggleEdit} />
                  </ModalBody>
                </Modal>
              </div>
              <div className="secondary-header">
                <h5>{this.state.trip.city},  {this.state.trip.state}</h5>
                <h5>{this.state.trip.start_date} - {this.state.trip.end_date}</h5>
              </div>

              <div className="trip-image">
                <img className="trip-photo" src={this.state.trip.photo} />
              </div>

              <div id="api">
                {this.renderAPI()}
              </div>
              <p className="trip-details">
                {this.state.trip.description}
              </p>
            </div>

            <div className="MessageBoard">
              <MessageBoard trip_id={this.state.trip.id}/>
            </div>



            <div className="itinerary-row">
            <div className="toggle-form"    id="toggle-form">
              <Button type="button" className="btn btn-primary btn-lg new-event-btn" onClick={this.toggleNewEvent.bind(this)}>
                 Add New Event
              </Button>
              <Modal isOpen={this.state.modal_new_event} toggle={this.toggleNewEvent}>
                <ModalHeader toggle={this.toggleNewEvent}>Add New Event</ModalHeader>
                <ModalBody id="toggleNewEvent">
                  < NewEvent toggleNewEvent={this.toggleNewEvent} />
                </ModalBody>
              </Modal>
            </div>
            <Itinerary tripOwner={this.state.trip.user_id}/>
            </div>

          </div>
          </div>
      )
    }
  }



export default withAuth(Trip);
