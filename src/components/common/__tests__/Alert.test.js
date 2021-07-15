import React from 'react';
import { shallow } from 'enzyme';
import Alert from '../Alert';

describe('Alert', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render a alert message with a close button', () => {
    const props = {
      message: 'test',
      onClickCloseButton: () => {},
    };
    const wrapper = shallow(<Alert {...props} />);
    expect(wrapper.find('.alert').text()).toBe('test');
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should have a style appropriate to a message status', () => {
    const props = {
      message: 'test',
      onClickCloseButton: () => {},
      status: 'error',
    };
    const wrapper = shallow(<Alert {...props} />);
    expect(wrapper.find('.alert-danger').length).toBe(1);
  });

  it('should have a info style as a default style', () => {
    const props = {
      message: 'test',
      onClickCloseButton: () => {},
    };
    const wrapper = shallow(<Alert {...props} />);
    expect(wrapper.find('.alert-info').length).toBe(1);
  });

  it('should call a handler on button click', () => {
    const handler = jest.fn(() => {});
    const props = {
      message: 'test',
      onClickCloseButton: handler,
    };
    const wrapper = shallow(<Alert {...props} />);
    wrapper.find('button').simulate('click');
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
