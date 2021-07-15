import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('should render a spinner', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.spinner-border').length).toBe(1);
  });
});
