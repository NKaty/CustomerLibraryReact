import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import NoteList from '../NoteList';

describe('NoteListPage', () => {
  it('should render DependentEntityList', () => {
    const wrapper = mount(
      <BrowserRouter>
        <NoteList />
      </BrowserRouter>
    );
    expect(wrapper.find('DependentEntityList').length).toBe(1);
    expect(typeof wrapper.find('DependentEntityList').props().entityProps).toBe(
      'object'
    );
  });
});
