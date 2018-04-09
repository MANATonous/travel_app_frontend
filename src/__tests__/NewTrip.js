import React from 'react';
import ReactDOM from 'react-dom';
import NewTrip from '../pages/NewTrip';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-localstorage-mock';

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NewTrip />, div)
})

it('has form title input', () => {
  const component = mount(<NewTrip />)
  expect(component.find('label.title').text()).toBe("Title")
})

it('has form city input', () => {
  const component = mount(<NewTrip />)
  expect(component.find('label.city').text()).toBe("City")
})

it('has form state input', () => {
  const component = mount(<NewTrip />)
  expect(component.find('label.state').text()).toBe("State")
})

it('has form country input', () => {
  const component = mount(<NewTrip />)
  expect(component.find('label.country').text()).toBe("Country")
})

it('has form start date input', () => {
  const component = mount(<NewTrip />)
  expect(component.find('label.start_date').text()).toBe("Start Date")
})

it('has form end date input', () => {
  const component = mount(<NewTrip />)
  expect(component.find('label.end_date').text()).toBe("End Date")
})

it('has form description input', () => {
  const component = mount(<NewTrip />)
  expect(component.find('label.description').text()).toBe("Description")
})

it('has form links input', () => {
  const component = mount(<NewTrip />)
  expect(component.find('label.link').text()).toBe("Links")
})


it('updates state on form change', ()=> {
  const component = mount(<NewTrip />)
  component.find('input.title').simulate('change', {target: {value: 'test', name: 'title'}})
  expect(component.state().form.title).toBe('test')
})
