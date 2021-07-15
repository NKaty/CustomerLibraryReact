import React from 'react';
import { shallow } from 'enzyme';
import NoteForm from '../NoteForm';

describe('NoteForm', () => {
  it('should render the form as a standalone form', () => {
    const props = {
      namespace: null,
      errors: {},
      touched: {},
    };
    const wrapper = shallow(<NoteForm {...props} />);
    expect(wrapper.find('Field').at(0).prop('name')).toBe('customerId');
    expect(wrapper.find('Field').at(1).prop('name')).toBe('noteId');
    expect(wrapper.find('Input').at(0).prop('fieldName')).toBe('noteText');
    expect(wrapper.find('Input').at(0).prop('fieldType')).toBe('textarea');
  });

  it('should render the form as a sub form', () => {
    const props = {
      namespace: { property: 'notes', index: 0 },
      errors: {},
      touched: {},
    };
    const wrapper = shallow(<NoteForm {...props} />);
    expect(wrapper.find('Field').at(0).prop('name')).toBe('notes.0.customerId');
    expect(wrapper.find('Field').at(1).prop('name')).toBe('notes.0.noteId');
    expect(wrapper.find('Input').at(0).prop('fieldName')).toBe(
      'notes.0.noteText'
    );
  });
});
