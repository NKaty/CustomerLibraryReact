import React from 'react';
import { mount } from 'enzyme';
import NoteFormPage from '../NoteFormPage';
import { BrowserRouter } from 'react-router-dom';

describe('NoteFormPage', () => {
  it('should render DependentEntityCreateEditForm', () => {
    const wrapper = mount(
      <BrowserRouter>
        <NoteFormPage />
      </BrowserRouter>
    );
    expect(wrapper.find('DependentEntityCreateEditForm').length).toBe(1);
    expect(
      typeof wrapper.find('DependentEntityCreateEditForm').props().entityProps
    ).toBe('object');
  });
});
