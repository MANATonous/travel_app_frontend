import React from 'react';
import ReactDOM from 'react-dom';
import Trips from '../Trips';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders trip without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Trip />, div);
});
