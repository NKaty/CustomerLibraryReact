import React from 'react';
import { shallow } from 'enzyme';
import ButtonLink from '../ButtonLink';

describe('ButtonLink', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render a button link', () => {
    const props = {
      label: 'test',
      onClickButton: () => {},
    };
    const wrapper = shallow(<ButtonLink {...props} />);
    expect(wrapper.find('button').text()).toBe('test');
  });

  it('should be disabled', () => {
    const props = {
      label: 'test',
      onClickButton: () => {},
      disabled: true,
    };
    const wrapper = shallow(<ButtonLink {...props} />);
    expect(wrapper.find('button').prop('disabled')).toBe(true);
  });

  it('should not be disabled by default', () => {
    const props = {
      label: 'test',
      onClickButton: () => {},
    };
    const wrapper = shallow(<ButtonLink {...props} />);
    expect(wrapper.find('button').prop('disabled')).toBe(false);
  });

  it('should call a handler on button click', () => {
    const handler = jest.fn(() => {});
    const props = {
      label: 'test',
      onClickButton: handler,
    };
    const wrapper = shallow(<ButtonLink {...props} />);
    wrapper.find('button').simulate('click');
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
