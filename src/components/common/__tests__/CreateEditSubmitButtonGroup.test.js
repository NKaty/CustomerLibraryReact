import React from 'react';
import { shallow } from 'enzyme';
import CreateEditSubmitButtonGroup from '../CreateEditSubmitButtonGroup';

describe('CreateEditSubmitButtonGroup', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render a button group', () => {
    const props = {
      isSubmitting: false,
      handleReset: () => {},
      onClickCancelButton: () => {},
    };
    const wrapper = shallow(<CreateEditSubmitButtonGroup {...props} />);
    expect(wrapper.find('button').first().text()).toBe('Save');
    expect(wrapper.find('button').last().text()).toBe('Reset');
    expect(wrapper.find('ButtonLink').length).toBe(1);
  });

  it('should have submit button disabled when submitting form', () => {
    const props = {
      isSubmitting: true,
      handleReset: () => {},
      onClickCancelButton: () => {},
    };
    const wrapper = shallow(<CreateEditSubmitButtonGroup {...props} />);
    expect(wrapper.find('[type="submit"]').prop('disabled')).toBe(true);
    expect(wrapper.find('ButtonSpinner').length).toBe(1);
  });

  it('should call reset handler on reset buttons click', () => {
    const resetHandler = jest.fn(() => {});
    const props = {
      isSubmitting: false,
      handleReset: resetHandler,
      onClickCancelButton: () => {},
    };
    const wrapper = shallow(<CreateEditSubmitButtonGroup {...props} />);
    wrapper.find('button').last().simulate('click');
    expect(resetHandler).toHaveBeenCalledTimes(1);
  });

  it('should pass a handler to button link', () => {
    const cancelHandler = jest.fn(() => {});
    const props = {
      isSubmitting: false,
      handleReset: () => {},
      onClickCancelButton: cancelHandler,
    };
    const wrapper = shallow(<CreateEditSubmitButtonGroup {...props} />);
    expect(wrapper.find('ButtonLink').last().prop('onClickButton')).toBe(
      cancelHandler
    );
  });
});
