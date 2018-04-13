import React, { Component } from 'react';
import '../css/Navigation.css';
import {Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService'

const Auth = new AuthService();

class Navigation extends Component {
  constructor(props){
  super(props)
  this.state = {
    collapsed: true
  }
  this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/Login')
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render(){
    return(
      <Navbar color="faded" light>
          <Link to="/">
            <NavbarBrand className="mr-auto">
              <h3>{"Trip & Share"}</h3>
            </NavbarBrand>
          </Link>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar align="right">
            <NavItem>
              <Link to="/">
                <NavLink>Dashboard</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/Login" onClick={this.handleLogout.bind(this)} className="logout">
                <NavLink>Logout</NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default Navigation;
