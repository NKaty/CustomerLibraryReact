import React from 'react';
import { mount } from 'enzyme';
import ContentLayout from '../ContentLayout';

describe('ContentLayout', () => {
  it('should render a content container with children', () => {
    const wrapper = mount(<ContentLayout>Test</ContentLayout>);
    expect(wrapper.find(ContentLayout).length).toBe(1);
    expect(wrapper.text()).toBe('Test');
  });
});
