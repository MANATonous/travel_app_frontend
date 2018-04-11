import React, { Component } from 'react';
import {Table} from 'reactstrap';
import {Button} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import Collapsible from './Collapsible.js'
import '../css/Trip.css';
import AuthService from '../services/AuthService';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv()

class Itinerary extends Component {
  constructor(props){
    super(props)
    this.Auth = new AuthService()
    this.state = {
      apiUrl: env.REACT_APP_API_URL,
      events: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillMount(){
    const trip_id = localStorage.getItem('trip_id')
    fetch(`${this.state.apiUrl}/events_by_trip/${trip_id}.json`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      this.setState({events: parsedResponse})
    })
  }

  handleDelete(i){
    let eventsArray = this.state.events
    const index = i.target.value
    const eventToDelete = eventsArray[index]
    fetch(`${this.state.apiUrl}/delete_event/${eventToDelete.id}`,
      {
        body: JSON.stringify(eventToDelete),
        headers: {
          'Content-Type': 'application/json'
        },
        method: "DELETE"
      }
    ).then((res) => {
      eventsArray.splice(index, 1)
      this.setState({events: eventsArray})
    })
  }

  render(){
    return(
      <div className="itinerary-card">
        <h2 className="events-header">Itinerary Ideas</h2>
        <hr/>
        {this.state.events.map((events, index) =>{
          if (this.Auth.getUserId() == this.props.tripOwner) {
            return(
              <Collapsible trigger={events.title} className="collapse-header">
              <Button type="button" className="btn btn-sm delete-button" value={index} onClick={this.handleDelete}> Delete Event </Button>
                <h5 className="event-location">{events.location}</h5>
                <h6 className="event-date">{events.date}</h6>
                <p className="event-description">{events.description}</p>
                <h6 className="event-link">{events.link}</h6>
              </Collapsible>
            )
          } else {
            return(
              <Collapsible trigger={events.title} className="collapse-header">
                <h5>{events.location}</h5>
                <h6>{events.date}</h6>
                <p>{events.description}</p>
                <h6>{events.link}</h6>
              </Collapsible>
            )
          }
        })}
      </div>
    )
  }

}

export default Itinerary;
