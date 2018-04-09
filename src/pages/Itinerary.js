import React, { Component } from 'react';
import NewEvent from './NewEvent';
import {Table} from 'reactstrap';
import {Button} from 'react-bootstrap';
import '../css/Trip.css';
import AuthService from '../services/AuthService';

class Itinerary extends Component {
  constructor(props){
    super(props)
    this.Auth = new AuthService()
    this.state = {
      apiUrl: 'http://localhost:3000',
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
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
          {this.state.events.map((events, index) =>{
            if (this.Auth.getUserId() == this.props.tripOwner) {
              return(
                <tr key={index}>
                  <td>{events.title}</td>
                  <td>{events.date}</td>
                  <td>{events.location}</td>
                  <td>{events.description}</td>
                  <td>{events.link}</td>
                  <td><Button type="button" className="btn btn-lg delete-button" value={index} onClick={this.handleDelete}> X </Button></td>
                </tr>
              )
            } else {
              return(
                <tr key={index}>
                  <td>{events.title}</td>
                  <td>{events.date}</td>
                  <td>{events.location}</td>
                  <td>{events.description}</td>
                  <td>{events.link}</td>
                </tr>
              )
            }
          })}
          </tbody>
        </Table>
      </div>
    )
  }

}

export default Itinerary;
