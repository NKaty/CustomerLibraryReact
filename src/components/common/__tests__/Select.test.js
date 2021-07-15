import React from 'react';
import { shallow } from 'enzyme';
import { ErrorMessage } from 'formik';
import Select from '../Select';

describe('Select', () => {
  it('should render a select with options', () => {
    const props = {
      displayName: 'displayName',
      fieldName: 'fieldName',
      options: ['test1', 'test2'],
      isError: false,
      isTouched: false,
    };
    const wrapper = shallow(<Select {...props} />);
    expect(wrapper.find('Field').prop('name')).toBe('fieldName');
    expect(wrapper.find('option').get(0).props.value).toBe('test1');
    expect(wrapper.find('option').get(1).props.value).toBe('test2');
    expect(wrapper.find(ErrorMessage).prop('name')).toBe('fieldName');
  });

  it('should render a select without validation error style', () => {
    const props = {
      displayName: 'displayName',
      fieldName: 'fieldName',
      options: [],
      isError: false,
      isTouched: false,
    };
    const wrapper = shallow(<Select {...props} />);
    expect(wrapper.find('Field').hasClass('is-invalid')).toBe(false);
  });

  it('should render a select with validation error style', () => {
    const props = {
      displayName: 'displayName',
      fieldName: 'fieldName',
      options: [],
      isError: true,
      isTouched: true,
    };
    const wrapper = shallow(<Select {...props} />);
    expect(wrapper.find('Field').hasClass('is-invalid')).toBe(true);
  });
});
