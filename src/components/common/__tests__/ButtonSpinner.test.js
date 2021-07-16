import React from 'react';
import { shallow } from 'enzyme';
import ButtonSpinner from '../ButtonSpinner';

describe('ButtonSpinner', () => {
  it('should render a button spinner', () => {
    const wrapper = shallow(<ButtonSpinner />);
    expect(wrapper.find('.spinner-border').length).toBe(1);
  });
});
