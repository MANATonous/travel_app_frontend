import React from 'react';
import ReactDOM from 'react-dom';
import NewEvent from '../pages/NewEvent';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-localstorage-mock';

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NewEvent />, div)
})

it('has form title input', () => {
  const component = mount(<NewEvent />)
  expect(component.find('label.title').text()).toBe("Title")
})

it('has form location input', () => {
  const component = mount(<NewEvent />)
  expect(component.find('label.location').text()).toBe("Location")
})

it('updates state on form change', ()=> {
  const component = mount(<NewEvent />)
  component.find('input.title').simulate('change', {target: {value: 'test', name: 'title'}})
  expect(component.state().form.title).toBe('test')
})
