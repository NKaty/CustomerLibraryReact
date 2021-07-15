import React from 'react';
import { shallow } from 'enzyme';
import NoteRouter from '../NoteRouter';

describe('NoteRouter', () => {
  it('should render routes', () => {
    const wrapper = shallow(<NoteRouter match={{ path: 'notes' }} />);
    expect(wrapper.find('Route').length).toBe(3);
    expect(wrapper.find('Route').at(0).props().path).toBe('notes');
    expect(wrapper.find('Route').at(0).props().component.name).toBe('NoteList');
    expect(wrapper.find('Route').at(1).props().path).toBe('notes/create');
    expect(wrapper.find('Route').at(1).props().component.name).toBe(
      'NoteFormPage'
    );
    expect(wrapper.find('Route').at(2).props().path).toBe('notes/edit/:noteId');
    expect(wrapper.find('Route').at(2).props().component.name).toBe(
      'NoteFormPage'
    );
  });
});
