import React from 'react';
import { shallow } from 'enzyme';
import ContentLayout from '../ContentLayout';

describe('ContentLayout', () => {
  it('should render a content container with children', () => {
    const wrapper = shallow(<ContentLayout>Test</ContentLayout>);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.text()).toBe('Test');
  });
});
