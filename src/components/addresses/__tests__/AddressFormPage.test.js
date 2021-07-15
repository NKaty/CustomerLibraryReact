import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import AddressFormPage from '../AddressFormPage';

describe('AddressFormPage', () => {
  it('should render DependentEntityCreateEditForm', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AddressFormPage />
      </BrowserRouter>
    );
    expect(wrapper.find('DependentEntityCreateEditForm').length).toBe(1);
    expect(
      typeof wrapper.find('DependentEntityCreateEditForm').props().entityProps
    ).toBe('object');
  });
});
