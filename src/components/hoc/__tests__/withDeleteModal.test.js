import React from 'react';
import { shallow } from 'enzyme';
import withDeleteModal from '../withDeleteModal';

describe('DependentEntityList', () => {
  let WithDeleteModalComponent;
  beforeEach(() => {
    const mockedComponent = jest.fn();
    WithDeleteModalComponent = withDeleteModal(mockedComponent);
  });

  it('should not have an open state from start', () => {
    const wrapper = shallow(<WithDeleteModalComponent />);

    expect(wrapper.instance().state.isModalOpen).toBe(false);
    expect(wrapper.instance().state.idToDelete).toBe(null);
  });

  it('should have an open state and id to delete after openModal call', () => {
    const wrapper = shallow(<WithDeleteModalComponent />);

    const openFn = wrapper.props().openModal(10);
    openFn({
      preventDefault: () => {},
    });
    expect(wrapper.instance().state.isModalOpen).toBe(true);
    expect(wrapper.instance().state.idToDelete).toBe(10);
  });

  it('should call service delete method, data callback and clean state', async () => {
    const _delete = jest.fn(() => Promise.resolve({}));
    const service = { delete: _delete };
    const errorCb = jest.fn(() => {});
    const dataCb = jest.fn(() => {});
    const wrapper = shallow(<WithDeleteModalComponent />);

    const openFn = wrapper.props().openModal(10);
    openFn({
      preventDefault: () => {},
    });
    const deleteFn = wrapper
      .props()
      .onClickModalDeleteButton(service, errorCb, dataCb);
    await deleteFn({
      preventDefault: () => {},
    });
    expect(_delete).toHaveBeenCalledTimes(1);
    expect(_delete).toBeCalledWith(10);
    expect(dataCb).toHaveBeenCalledTimes(1);
    expect(errorCb).toHaveBeenCalledTimes(0);
    expect(wrapper.instance().state.isModalOpen).toBe(false);
    expect(wrapper.instance().state.idToDelete).toBe(null);
  });

  it('should call service delete method and error callback and clean state', async () => {
    const _delete = jest.fn(() => Promise.resolve({ error: true }));
    const service = { delete: _delete };
    const errorCb = jest.fn(() => {});
    const dataCb = jest.fn(() => {});
    const wrapper = shallow(<WithDeleteModalComponent />);

    const openFn = wrapper.props().openModal(10);
    openFn({
      preventDefault: () => {},
    });
    const deleteFn = wrapper
      .props()
      .onClickModalDeleteButton(service, errorCb, dataCb);
    await deleteFn({
      preventDefault: () => {},
    });
    expect(_delete).toHaveBeenCalledTimes(1);
    expect(_delete).toBeCalledWith(10);
    expect(dataCb).toHaveBeenCalledTimes(0);
    expect(errorCb).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.isModalOpen).toBe(false);
    expect(wrapper.instance().state.idToDelete).toBe(null);
  });

  it('should not call service delete method if there is no idToDelete', async () => {
    const _delete = jest.fn(() => Promise.resolve({}));
    const service = { delete: _delete };
    const wrapper = shallow(<WithDeleteModalComponent />);

    const openFn = wrapper.props().openModal(null);
    openFn({
      preventDefault: () => {},
    });
    const deleteFn = wrapper.props().onClickModalDeleteButton(service);
    await deleteFn({
      preventDefault: () => {},
    });
    expect(_delete).toHaveBeenCalledTimes(0);
    expect(wrapper.instance().state.isModalOpen).toBe(false);
    expect(wrapper.instance().state.idToDelete).toBe(null);
  });

  it('should clean state on close model call', () => {
    const wrapper = shallow(<WithDeleteModalComponent />);

    const openFn = wrapper.props().openModal(10);
    openFn({
      preventDefault: () => {},
    });
    expect(wrapper.instance().state.isModalOpen).toBe(true);
    expect(wrapper.instance().state.idToDelete).toBe(10);

    wrapper.props().onClickModalCancelButton({
      preventDefault: () => {},
    });
    expect(wrapper.instance().state.isModalOpen).toBe(false);
    expect(wrapper.instance().state.idToDelete).toBe(null);
  });

  it('should pass isModalOpen and idToDelete as props to original component', () => {
    const wrapper = shallow(<WithDeleteModalComponent />);

    expect(wrapper.props().isModalOpen).toBe(false);
    expect(wrapper.props().idToDelete).toBe(null);
  });
});
