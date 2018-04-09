import React, { Component } from 'react';

class TicketmasterAPI extends Component {
  constructor(props){
    super(props)
    this.state = {
      external_api_url: "http://app.ticketmaster.com/discovery/v2/events.json?city=",
      external_api_key: "&apikey=WwUmoqZet3yeAma97s5JpgGXV8n6R8qO",
      trip_city: '',
      suggested_event: ''
      }
    }

  runAPI(){
    localStorage.getItem('city').length > 0 ? this.getAPI() : null
  }

  getAPI(){
    fetch(`${this.state.external_api_url}${localStorage.getItem('city')}${this.state.external_api_key}`)
    .then((res) =>{
      return res.json()
    })
    .then((parsedResponse) =>{
      if (parsedResponse._embedded != undefined) {
        const events = parsedResponse._embedded.events
        const sug_event = events[Math.floor(Math.random()*events.length)]
        this.setState({suggested_event: sug_event})
      } else {
        null
      }
    })
  }

  renderAPI(){

    return (
      <div className="api">
        <h5>{"What's happening locally?"}</h5>
        <p> {this.state.suggested_event.name} - {this.state.suggested_event.dates.start.localDate} <a href={this.state.suggested_event.url}>Learn More </a></p>
      </div>
    )
  }

    render() {
      {this.state.suggested_event.name == undefined ? this.runAPI() : null}

      return (
        <div>
          {this.state.suggested_event.name != undefined ? this.renderAPI() : null}
        </div>
      )
    }
  }

  export default TicketmasterAPI;
