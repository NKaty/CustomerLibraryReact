import React from 'react';
import { shallow } from 'enzyme';
import { ErrorMessage } from 'formik';
import Input from '../Input';

describe('Input', () => {
  it('should render an input without validation error style', () => {
    const props = {
      displayName: 'displayName',
      fieldName: 'fieldName',
      isError: false,
      isTouched: false,
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('Field').prop('name')).toBe('fieldName');
    expect(wrapper.find('Field').hasClass('is-invalid')).toBe(false);
    expect(wrapper.find(ErrorMessage).prop('name')).toBe('fieldName');
  });

  it('should render an input with validation error style', () => {
    const props = {
      displayName: 'displayName',
      fieldName: 'fieldName',
      isError: true,
      isTouched: true,
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('Field').hasClass('is-invalid')).toBe(true);
  });

  it('should render an input as an input by default', () => {
    const props = {
      displayName: 'displayName',
      fieldName: 'fieldName',
      isError: true,
      isTouched: true,
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('Field').prop('as')).toBe('input');
  });

  it('should render an input as a textarea', () => {
    const props = {
      displayName: 'displayName',
      fieldName: 'fieldName',
      fieldType: 'textarea',
      isError: true,
      isTouched: true,
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('Field').prop('as')).toBe('textarea');
  });
});
