import React, { Component } from 'react';
import '../css/Navigation.css';
import {Navbar, NavbarBrand, Nav, DropdownToggle, Dropdown, DropdownItem,Collapse, DropdownMenu, NavbarToggler, NavItem, NavLink,dropdown, menu } from 'reactstrap';
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
    this.props.history.replace('/login')
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render(){
    return(
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto"><h3>{"Trippin' Out"}</h3></NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar align="right">
            <NavItem>
              <NavLink href="/Dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Login" onClick={this.handleLogout.bind(this)} className="logout">Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default Navigation;
