import React from 'react';
import { shallow } from 'enzyme';
import AddressRouter from '../AddressRouter';

describe('AddressRouter', () => {
  it('should render routes', () => {
    const wrapper = shallow(<AddressRouter match={{ path: 'addresses' }} />);
    expect(wrapper.find('Route').length).toBe(3);
    expect(wrapper.find('Route').at(0).props().path).toBe('addresses');
    expect(wrapper.find('Route').at(0).props().component.name).toBe(
      'AddressList'
    );
    expect(wrapper.find('Route').at(1).props().path).toBe('addresses/create');
    expect(wrapper.find('Route').at(1).props().component.name).toBe(
      'AddressFormPage'
    );
    expect(wrapper.find('Route').at(2).props().path).toBe(
      'addresses/edit/:addressId'
    );
    expect(wrapper.find('Route').at(2).props().component.name).toBe(
      'AddressFormPage'
    );
  });
});
