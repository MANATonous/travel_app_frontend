import React, { Component } from 'react';
import '../css/Dashboard.css';
import { CardDeck, Navbar, NavbarBrand, Nav, Modal, ModalBody, ModalHeader, Button, ModalFooter, DropdownToggle, Dropdown, DropdownItem,Collapse, DropdownMenu, NavbarToggler, NavItem, NavLink, jumbotron, dropdown, menu } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../css/AuthUserNavFooter.css';
import NewTrip from './NewTrip';
import JoinTrip from './JoinTrip';
import Navigation from './Navigation';
import AuthService from '../services/AuthService';
import withAuth from '../services/withAuth';

const Auth = new AuthService()

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      apiUrl: "http://localhost:3000",
      user_trips: [],
      joined_trips: [],
      collapsed: true,
      modal_create: false,
      modal_join: false,
      user_info: []
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleJoin = this.toggleJoin.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleCreate() {
    this.setState({
      modal_create: !this.state.modal_create
    });
  }

  toggleJoin() {
    this.setState({
      modal_join: !this.state.modal_join
    });
  }

  componentWillMount(){

    //Get user ID from local storage token
    const userID = this.auth.getUserId()

    //Reset local storage
    localStorage.getItem('trip_id') !== null ? localStorage.setItem('trip_id', null) : localStorage.getItem('trip_id')

    fetch(`${this.state.apiUrl}/trips_by_user/${userID}`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      const ownedTrips = []
      const joinedTrips = []
      parsedResponse.map((trip) => {
        if (trip.user_id == userID) {
          ownedTrips.push(trip);
        } else {
          joinedTrips.push(trip)
        }
      })
      this.setState({user_trips: ownedTrips ,joined_trips: joinedTrips})
    })

    fetch(`${this.state.apiUrl}/user_info/${userID}.json`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      this.setState({user_info: parsedResponse})
      localStorage.setItem('user_first', this.state.user_info[0].first_name)
      localStorage.setItem('user_last', this.state.user_info[0].last_name.charAt(0))
    })

  }

  render(){
    return(
      <div>
        <Navigation />
        <div className= "jumbotron" id="dash-header">
          <div id="dash-header-text">
            <h1 id="dash-header-title">{"Welcome to Trippin' Out!"}</h1>
            <p className= "lead" id="dash-header-subtitle"> Create and Manage Trips with Friends and Family </p>
            <hr className= "my-4" />
          </div>

          <button type="button" className="btn btn-lg btn-block " id= "button1" onClick={this.toggleCreate}>Create New Trip</button>
          <Modal isOpen={this.state.modal_create} toggle={this.toggleCreate}>
            <ModalHeader toggle={this.toggleCreate}>Create New Trip</ModalHeader>
            <ModalBody id="toggleCreate">
              < NewTrip toggleNewTrip={this.toggleCreate} />
            </ModalBody>
          </Modal>

          <button type="button" className="btn btn-lg btn-block"  id= "button2" onClick={this.toggleJoin}>Join A Trip</button>
          <Modal isOpen={this.state.modal_join} toggle={this.toggleJoin}>
            <ModalHeader toggle={this.toggleJoin}>Enter Trip ID Here!</ModalHeader>
              <ModalBody>
                < JoinTrip toggleJoinTrip={this.toggleJoin} />
              </ModalBody>
            </Modal>
        </div>
        <div>
          <h3 className="label">My Trips</h3>
          <hr className= "my-4 dashboard-line" />
        </div>
        <CardDeck className="card-deck">
          {this.state.user_trips.map((trips, index) => {
            return(
              <div className="card dashboard-card" key={index}>
                <Link to={`/Trip/${trips.id}`} style={{ textDecoration: 'none' }}>
                  <h3 className="card-header">{trips.title}</h3>
                </Link>
                <div className="card-body">
                  <h3 className="card-subtitle text-muted">Trip Code: {trips.rand_code}</h3>
                  <h6 className="card-subtitle text-muted">{trips.start_date} to {trips.end_date}</h6>
                </div>
                <img className= "tripsImage" src={trips.photo} alt="Vacation Scene" />
                <div className="card-body">
                  <p className="card-text">{trips.description}</p>
                </div>
              </div>
            )
          })}
        </CardDeck>

        <div>
          <h3 className="label">{"Trips I'm Going On"}</h3>
          <hr className= "my-4 dashboard-line" />
        </div>
        <CardDeck className="card-deck">
          {this.state.joined_trips.map((trips, index) => {
            return(
              <div className="card dashboard-card" key={index}>
                <Link to={`/Trip/${trips.id}`} style={{ textDecoration: 'none' }}>
                  <h3 className="card-header" >{trips.title}</h3>
                </Link>
                <div className="card-body">
                  <h6 className="card-subtitle text-muted">{trips.start_date} to {trips.end_date}</h6>
                </div>
                <img className= "tripsImage" src={trips.photo} alt="Vacation Scene" />
                <div className="card-body">
                  <p className="card-text">{trips.description}</p>
                </div>
              </div>
            )
          })}
        </CardDeck>
      </div>

    );
  }
}

export default withAuth(Dashboard);
