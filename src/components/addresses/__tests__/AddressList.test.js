import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import AddressList from '../AddressList';

describe('AddressListPage', () => {
  it('should render DependentEntityList', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AddressList />
      </BrowserRouter>
    );
    expect(wrapper.find('DependentEntityList').length).toBe(1);
    expect(typeof wrapper.find('DependentEntityList').props().entityProps).toBe(
      'object'
    );
  });
});
