import React from 'react';
import { shallow } from 'enzyme';
import CustomerRouter from '../CustomerRouter';

describe('CustomerRouter', () => {
  it('should render routes', () => {
    const wrapper = shallow(<CustomerRouter match={{ path: 'customers' }} />);
    expect(wrapper.find('Route').length).toBe(5);
    expect(wrapper.find('Route').at(0).props().path).toBe('customers');
    expect(wrapper.find('Route').at(1).props().path).toBe('customers/create');
    expect(wrapper.find('Route').at(2).props().path).toBe(
      'customers/edit/:customerId'
    );
    expect(wrapper.find('Route').at(3).props().path).toBe(
      'customers/:customerId/addresses'
    );
    expect(wrapper.find('Route').at(3).props().component.name).toBe(
      'AddressRouter'
    );
    expect(wrapper.find('Route').at(4).props().path).toBe(
      'customers/:customerId/notes'
    );
    expect(wrapper.find('Route').at(4).props().component.name).toBe(
      'NoteRouter'
    );
  });
});
