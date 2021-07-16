import React from 'react';
import { shallow } from 'enzyme';
import CustomerForm from '../CustomerForm';

describe('CustomerForm', () => {
  it('should render the form as a standalone form', () => {
    const props = {
      namespace: null,
      errors: {},
      touched: {},
    };
    const wrapper = shallow(<CustomerForm {...props} />);
    expect(wrapper.find('Field').at(0).prop('name')).toBe('customerId');
    expect(wrapper.find('Field').at(0).prop('hidden')).toBe(true);
    expect(wrapper.find('Input').at(0).prop('fieldName')).toBe('firstName');
    expect(wrapper.find('Input').at(1).prop('fieldName')).toBe('lastName');
    expect(wrapper.find('Input').at(2).prop('fieldName')).toBe('phoneNumber');
    expect(wrapper.find('Input').at(3).prop('fieldName')).toBe('email');
    expect(wrapper.find('Input').at(4).prop('fieldName')).toBe(
      'totalPurchasesAmount'
    );
  });

  it('should render the form as a sub form', () => {
    const props = {
      namespace: { property: 'customers', index: 0 },
      errors: {},
      touched: {},
    };
    const wrapper = shallow(<CustomerForm {...props} />);
    expect(wrapper.find('Field').at(0).prop('name')).toBe(
      'customers.0.customerId'
    );
    expect(wrapper.find('Input').at(0).prop('fieldName')).toBe(
      'customers.0.firstName'
    );
    expect(wrapper.find('Input').at(1).prop('fieldName')).toBe(
      'customers.0.lastName'
    );
    expect(wrapper.find('Input').at(2).prop('fieldName')).toBe(
      'customers.0.phoneNumber'
    );
    expect(wrapper.find('Input').at(3).prop('fieldName')).toBe(
      'customers.0.email'
    );
    expect(wrapper.find('Input').at(4).prop('fieldName')).toBe(
      'customers.0.totalPurchasesAmount'
    );
  });
});
