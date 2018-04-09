import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../pages/Login';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', ()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Login />, div)
})

it('has a form', () => {
  const component = mount(<Login />);
  expect(component.find('label.email').text()).toBe('Email')
})

it('updates state on form change', ()=> {
  const component = mount(<Login />)
  component.find('input.email').simulate('change', {target: {value: 'test@test.com', name: 'email'}})
  expect(component.state().form.email).toBe('test@test.com')
})
