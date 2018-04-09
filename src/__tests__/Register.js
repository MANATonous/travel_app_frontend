import React from 'react';
import ReactDOM from 'react-dom';
import Register from '../pages/Register';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const form = {
  first_name: 'test',
  last_name: 'test',
  city: 'ca',
  state: 'ca',
  email: 'email@emal.cpm',
  password: 'pass',
  password_confirmation: 'pass',
}

it('renders without crashing', ()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Register />, div)
})

it('has an first name input', ()=>{
  const component = mount(<Register />);
  expect(component.find('#first_name').text()).toBe('First Name')
})

it('has an last name input', ()=>{
  const component = mount(<Register />);
  expect(component.find('#last_name').text()).toBe('Last Name')
})

it('has an email input', ()=>{
  const component = mount(<Register />);
  expect(component.find('label#email').text()).toBe('Email')
})

it('has an password input', ()=>{
  const component = mount(<Register />);
  expect(component.find('label#password').text()).toBe('Password')
})

it('has an password confirmation input', ()=>{
  const component = mount(<Register />);
  expect(component.find('label#password_confirmation').text()).toBe('Password Confirm')
})

it('updates state on form change', ()=> {
  const component = mount(<Register />)
  component.find('input#first_name_test').simulate('change', {target: {value: 'test', name: 'first_name'}})
  expect(component.state().form.first_name).toBe('test')
})


// it('', ()=>{
//
// })
