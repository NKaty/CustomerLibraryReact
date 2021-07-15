import React from 'react';
import { shallow } from 'enzyme';
import Table from '../Table';

describe('Table', () => {
  it('should render a table', () => {
    const props = {
      columns: [
        { name: 'test1', displayName: 'Test1' },
        { name: 'test2', displayName: 'Test2' },
      ],
      data: [{ test1: 'data1', test2: 'data2' }],
    };
    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find('thead th').at(0).text()).toBe('Test1');
    expect(wrapper.find('thead th').at(1).text()).toBe('Test2');
    expect(wrapper.find('tbody td').at(0).text()).toBe('data1');
    expect(wrapper.find('tbody td').at(1).text()).toBe('data2');
  });
});
