import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {ListGroup, ListGroupItem, Badge, Col, Form} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import '../css/MessageBoard.css';
import AuthService from '../services/AuthService'

const Auth = new AuthService()


class MessageBoard extends Component {

  constructor(props){
    super(props)
    this.state = {
      apiUrl: "http://localhost:3000",
      chats: [],
      avatar: '',
      error: '',
      form: {
        user_id: '',
        trip_id: '',
        message_text: '',
        display_name: ''
      }
    }
  }


  componentWillMount(){

    // grab user_id from JWT and trip_id from local localStorage
    const { form } = this.state
    form.user_id = Auth.getUserId()
    form.trip_id = localStorage.getItem('trip_id')
    // this.state.avatar = localStorage.getItem('avatar')

    fetch(`${this.state.apiUrl}/messages_by_trip/${form.trip_id}.json`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      this.setState(
        {chats: parsedResponse}
        )
    })
    this.generateDisplayName()
  }

  generateDisplayName(){
    const { form } = this.state
    form.display_name = localStorage.getItem('user_first').concat(' ', `${localStorage.getItem('user_last')}`)
    this.setState({ form })
  }

  handleChange(e){
    const { form } = this.state
    form.message_text = e.target.value
    this.setState({ form })
  }



  submitMessage(e){
    e.preventDefault()
    e.target.reset()
    const newMessage = this.state.form
    fetch(`${this.state.apiUrl}/messages`,
      {
        body: JSON.stringify(newMessage),
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST"
      }
    )
    .then((rawResponse) => {
      return Promise.all([rawResponse.status, rawResponse.json()])
    })
    .then((parsedResponse) =>{  this.state.error
      if (parsedResponse[0] === 422) {
        this.setState({errors: 'Invalid Inputs'})
      } else {
        let chat = this.state.chats
        let newMes = {
          user_id:parsedResponse[1]['user_id'],
          trip_id:parsedResponse[1]['trip_id'],
          message:parsedResponse[1]['message'],
          display_name:parsedResponse[1]['display_name']
        }
        chat.push(newMes)
        this.setState({errors: null, chats: chat})
        this.render()
      }})
  }

  render() {
    return (
      <div className="message-board">
        <h2 className="message-header">Message Board</h2>
          <Scrollbars className="message-box" style={{ height: 600 }}
          >
          {this.state.chats.map((chats, index) =>{
            return(
                <ListGroup key={index}>
                    <Col sm={12}>
                      <ListGroupItem className="chatMessage">
                      <button type="button" id="message-display-name" className="btn btn-primary btn-sm disabled nohover">
                      <strong>{chats.display_name}</strong>
                      </button> {chats.message}</ListGroupItem>
                    </Col>
                </ListGroup>
            )
          })}
          </Scrollbars>

          <div className="submits">
            <form id="message-submit"  onSubmit={this.submitMessage.bind(this)}>
              <textarea id="newsuggestion"
              rows="4"
              onChange={this.handleChange.bind(this)}></textarea>

              <br /> <input type="submit" value="Submit" className="btn btn-secondary" id="newsuggestion2"/>
            </form>
          </div>
        </div>
      )
    }
  }




export default MessageBoard;
