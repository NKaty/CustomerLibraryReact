import React from 'react';
import { shallow } from 'enzyme';
import AddressForm from '../AddressForm';

describe('AddressForm', () => {
  it('should render the form as a standalone form', () => {
    const props = {
      namespace: null,
      errors: {},
      touched: {},
    };
    const wrapper = shallow(<AddressForm {...props} />);
    expect(wrapper.find('Field').at(0).prop('name')).toBe('customerId');
    expect(wrapper.find('Field').at(0).prop('hidden')).toBe(true);
    expect(wrapper.find('Field').at(1).prop('name')).toBe('addressId');
    expect(wrapper.find('Field').at(1).prop('hidden')).toBe(true);
    expect(wrapper.find('Input').at(0).prop('fieldName')).toBe('addressLine');
    expect(wrapper.find('Input').at(1).prop('fieldName')).toBe('addressLine2');
    expect(wrapper.find('Input').at(2).prop('fieldName')).toBe('city');
    expect(wrapper.find('Input').at(3).prop('fieldName')).toBe('postalCode');
    expect(wrapper.find('Input').at(4).prop('fieldName')).toBe('state');
  });

  it('should render the form as a sub form', () => {
    const props = {
      namespace: { property: 'addresses', index: 0 },
      errors: {},
      touched: {},
    };
    const wrapper = shallow(<AddressForm {...props} />);
    expect(wrapper.find('Field').at(0).prop('name')).toBe(
      'addresses.0.customerId'
    );
    expect(wrapper.find('Field').at(1).prop('name')).toBe(
      'addresses.0.addressId'
    );
    expect(wrapper.find('Input').at(0).prop('fieldName')).toBe(
      'addresses.0.addressLine'
    );
    expect(wrapper.find('Input').at(1).prop('fieldName')).toBe(
      'addresses.0.addressLine2'
    );
    expect(wrapper.find('Input').at(2).prop('fieldName')).toBe(
      'addresses.0.city'
    );
    expect(wrapper.find('Input').at(3).prop('fieldName')).toBe(
      'addresses.0.postalCode'
    );
    expect(wrapper.find('Input').at(4).prop('fieldName')).toBe(
      'addresses.0.state'
    );
  });
});
