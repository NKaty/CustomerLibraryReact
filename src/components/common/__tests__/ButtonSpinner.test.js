import React from 'react';
import { shallow } from 'enzyme';
import ButtonSpinner from '../Spinner';

describe('ButtonSpinner', () => {
  it('should render a spinner', () => {
    const wrapper = shallow(<ButtonSpinner />);
    expect(wrapper.find('span').length).toBe(1);
  });
});
