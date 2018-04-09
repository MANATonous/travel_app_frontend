import React from 'react';
import ReactDOM from 'react-dom';
import Trips from '../Trips';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders trips without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Trips />, div);
});

it('renders the trip title', () => {
  const component = mount(<Trips />)
  const title = component.find('.card-header').first()
  expect(title.text()).toBe("Las Vegas")
})

it('renders the trip dates', () => {
  const component = mount(<Trips />)
  const date = component.find('.card-subtitle').first()
  expect(date.text()).toBe("2018-08-22 to 2018-08-24")
})

it('renders the trip description', () => {
  const component = mount(<Trips />)
  const description = component.find('.card-text').first()
  expect(description.text()).toBe('Rachel and Ross wedding')
})

it('renders the trip link', () => {
  const component = mount(<Trips />)
  const link = component.find('.card-link').first()
  expect(link.text()).toBe('www.google.com')
})
