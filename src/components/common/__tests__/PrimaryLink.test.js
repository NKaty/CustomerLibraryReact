import React from 'react';
import { shallow } from 'enzyme';
import PrimaryLink from '../PrimaryLink';

describe('PrimaryLink', () => {
  it('should render a link', () => {
    const wrapper = shallow(<PrimaryLink to="">Test</PrimaryLink>);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.text()).toBe('Test');
  });
});
