import React from 'react';
import { shallow } from 'enzyme';
import withAlert from '../withAlert';

describe('DependentEntityList', () => {
  let WithAlertComponent;
  beforeEach(() => {
    const mockedComponent = jest.fn();
    WithAlertComponent = withAlert(mockedComponent);
  });

  it('should not have a message to render from start', () => {
    const wrapper = shallow(<WithAlertComponent />);

    expect(wrapper.instance().state.message).toBe(null);
    expect(wrapper.instance().state.status).toBe(null);
  });

  it('should have a message to render after showAlert call', () => {
    const wrapper = shallow(<WithAlertComponent />);

    wrapper.props().showAlert('error', 'info');
    expect(wrapper.instance().state.message).toBe('error');
    expect(wrapper.instance().state.status).toBe('info');
  });

  it('should clean state on closeAlert call', () => {
    const wrapper = shallow(<WithAlertComponent />);

    wrapper.props().showAlert('error', 'info');
    expect(wrapper.instance().state.message).toBe('error');
    expect(wrapper.instance().state.status).toBe('info');

    wrapper.props().closeAlert();
    expect(wrapper.instance().state.message).toBe(null);
    expect(wrapper.instance().state.status).toBe(null);
  });

  it('should pass message and status as props to original component', () => {
    const wrapper = shallow(<WithAlertComponent />);

    wrapper.props().showAlert('error', 'info');
    expect(wrapper.props().message).toBe('error');
    expect(wrapper.props().status).toBe('info');
  });
});
