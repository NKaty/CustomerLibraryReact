import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../Modal';

describe('Modal', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render a modal with a backdrop', () => {
    const props = {
      title: 'Modal',
      body: 'test',
      cancelButtonLabel: 'cancel',
      actionButtonLabel: 'action',
      onCancel: () => {},
      onAction: () => {},
    };
    const wrapper = shallow(<Modal {...props} />);
    expect(wrapper.find('.modal-title').text()).toBe('Modal');
    expect(wrapper.find('.modal-body').text()).toBe('test');
    expect(wrapper.find('.modal-footer button').first().text()).toBe('cancel');
    expect(wrapper.find('.modal-footer button').last().text()).toBe('action');
  });

  it('should call handlers on button clicks', () => {
    const cancelHandler = jest.fn(() => {});
    const actionHandler = jest.fn(() => {});

    const props = {
      title: 'Modal',
      body: 'test',
      cancelButtonLabel: 'cancel',
      actionButtonLabel: 'action',
      onCancel: cancelHandler,
      onAction: actionHandler,
    };
    const wrapper = shallow(<Modal {...props} />);
    wrapper.find('.modal-header .btn-close').simulate('click');
    wrapper.find('.modal-footer button').first().simulate('click');
    wrapper.find('.modal-footer button').last().simulate('click');
    expect(cancelHandler).toHaveBeenCalledTimes(2);
    expect(actionHandler).toHaveBeenCalledTimes(1);
  });
});
