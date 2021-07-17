import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { CustomerList } from '../CustomerList';
import service from '../../../services/customer.service';

jest.mock('../../../services/customer.service');

describe('DependentEntityList', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const props = {
    location: { pathname: '/customers' },
    isModalOpen: false,
    match: { params: { customerId: 2 } },
    openModal: () => () => {},
    showAlert: () => {},
    closeAlert: () => {},
    onClickModalCancelButton: () => {},
    onClickModalDeleteButton: () => () => {},
  };

  it('should render a spinner', () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const wrapper = shallow(<CustomerList {...props} />);
    expect(wrapper.find('Spinner').length).toBe(1);
  });

  it('should render a customer table', async () => {
    service.getPage.mockImplementation(() => Promise.resolve({}));
    const wrapper = shallow(<CustomerList {...props} />);
    await wrapper.update();

    expect(wrapper.find('Table').length).toBe(1);
  });

  it('should render an alert', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const currentProps = {
      ...props,
      message: 'Error',
    };
    const wrapper = shallow(<CustomerList {...currentProps} />);
    await wrapper.update();

    expect(wrapper.find('Alert').length).toBe(1);
  });

  it('should render an delete modal', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const currentProps = {
      ...props,
      isModalOpen: true,
    };
    const wrapper = shallow(<CustomerList {...currentProps} />);
    await wrapper.update();

    expect(wrapper.find('Modal').length).toBe(1);
  });

  it('should render a create customer link', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const wrapper = shallow(<CustomerList {...props} />);
    await wrapper.update();

    expect(wrapper.find('PrimaryLink').props().to).toBe('/customers/create/');
  });

  it('should set state for empty response', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const wrapper = shallow(<CustomerList {...props} />);
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      customers: [],
      totalCount: 0,
      isLoading: false,
      isLoaded: true,
    });
    expect(service.getPage).toHaveBeenCalledTimes(1);
  });

  it('should set state for response with data', async () => {
    service.getPage.mockImplementation(() =>
      Promise.resolve({ customers: [{ name: 'Bob' }], totalCount: 1 })
    );
    const wrapper = shallow(<CustomerList {...props} />);
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      customers: [{ name: 'Bob' }],
      totalCount: 1,
      isLoading: false,
      isLoaded: true,
    });
    expect(service.getPage).toHaveBeenCalledTimes(1);
  });

  it('should set state for response with error', async () => {
    service.getPage.mockImplementation(() =>
      Promise.resolve({ error: true, errorTitle: 'Error' })
    );
    const showAlertMock = jest.fn(() => {});
    const currentProps = { ...props, showAlert: showAlertMock };
    const wrapper = shallow(<CustomerList {...currentProps} />);
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      customers: [],
      totalCount: 0,
      isLoading: false,
      isLoaded: true,
    });
    expect(service.getPage).toHaveBeenCalledTimes(1);
    expect(showAlertMock).toHaveBeenCalledTimes(1);
  });

  it('should call close alert message and service.getPage on update', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = { ...props, closeAlert: closeAlertMock };
    const wrapper = shallow(<CustomerList {...currentProps} />);
    await wrapper.update();

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(1);
    expect(service.getPage).toHaveBeenCalledTimes(2);
  });

  it('should not call close alert message and service.getPage on update if isLoaded is true', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = { ...props, closeAlert: closeAlertMock };
    const wrapper = shallow(<CustomerList {...currentProps} />);
    await wrapper.update();

    wrapper.instance().state.isLoaded = true;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(0);
    expect(service.getPage).toHaveBeenCalledTimes(1);
  });

  it('should not call close alert message and service.getPage on update if isLoading is true', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = { ...props, closeAlert: closeAlertMock };
    const wrapper = shallow(<CustomerList {...currentProps} />);
    await wrapper.update();

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = true;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(0);
    expect(service.getPage).toHaveBeenCalledTimes(1);
  });

  it('should getCurrentPage return a correct current page', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const wrapper = shallow(<CustomerList {...props} />);
    await wrapper.update();

    const getCurrentPage = wrapper.instance().getCurrentPage;
    expect(getCurrentPage({ search: '?page=10' })).toBe(10);
    expect(getCurrentPage({ search: '?page=1' })).toBe(1);
    expect(getCurrentPage({ search: '?page=0' })).toBe(1);
    expect(getCurrentPage({ search: '?page=null' })).toBe(1);
  });

  it('should getPageParams return correct params', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const wrapper = shallow(<CustomerList {...props} />);
    await wrapper.update();

    const instance = wrapper.instance();
    instance.pagination.perPage = 5;

    instance.props.location.search = '?page=3';
    expect(instance.getPageParams()).toStrictEqual([10, 5]);
    instance.props.location.search = '?page=1';
    expect(instance.getPageParams()).toStrictEqual([0, 5]);
    instance.props.location.search = '?page=null';
    expect(instance.getPageParams()).toStrictEqual([0, 5]);
    instance.props.location.search = '?page=0';
    expect(instance.getPageParams()).toStrictEqual([0, 5]);
  });

  it('should return correct delete modal props', async () => {
    service.getPage.mockImplementation(() => Promise.resolve());
    const onClickModalDeleteButtonMock = jest.fn();
    const currentProps = {
      ...props,
      onClickModalDeleteButton: onClickModalDeleteButtonMock,
    };
    const wrapper = shallow(<CustomerList {...currentProps} />);
    await wrapper.update();
    const errorModalProps = wrapper.instance().getDeleteModalProps();
    delete errorModalProps.onAction;
    errorModalProps.onCancel = errorModalProps.onCancel.name;

    expect(errorModalProps).toStrictEqual({
      title: 'Delete customer',
      body: 'Are you sure you want to delete this customer?',
      cancelButtonLabel: 'Cancel',
      actionButtonLabel: 'Delete',
      onCancel: 'onClickModalCancelButton',
    });
    expect(onClickModalDeleteButtonMock).toHaveBeenCalledTimes(1);
  });

  it('should render correct link for edit, addresses, notes', async () => {
    service.getPage.mockImplementation(() =>
      Promise.resolve({
        customers: [{ customerId: 2, firstName: 'Bob', lastName: 'Smith' }],
        totalCount: 1,
      })
    );
    const wrapper = mount(
      <BrowserRouter>
        <CustomerList {...props} />
      </BrowserRouter>
    );
    await wrapper.instance().componentDidMount();
    await wrapper.update();

    expect(wrapper.find('PrimaryLink').at(1).text()).toBe('Addresses');
    expect(wrapper.find('PrimaryLink').at(1).props().to).toStrictEqual({
      pathname: '/customers/2/addresses/',
      state: 'Bob Smith',
    });
    expect(wrapper.find('PrimaryLink').at(2).text()).toBe('Notes');
    expect(wrapper.find('PrimaryLink').at(2).props().to).toStrictEqual({
      pathname: '/customers/2/notes/',
      state: 'Bob Smith',
    });
    expect(wrapper.find('PrimaryLink').at(3).text()).toBe('Edit');
    expect(wrapper.find('PrimaryLink').at(3).props().to).toStrictEqual(
      '/customers/edit/2/'
    );
  });

  it('should delete button open a delete modal', async () => {
    service.getPage.mockImplementation(() =>
      Promise.resolve({
        customers: [{ customerId: 2, firstName: 'Bob', lastName: 'Smith' }],
        totalCount: 1,
      })
    );
    const onClickDeleteButtonMock = jest.fn(() => {});
    const openModalMock = jest.fn(() => onClickDeleteButtonMock);
    const currentProps = { ...props, openModal: openModalMock };
    const wrapper = mount(
      <BrowserRouter>
        <CustomerList {...currentProps} />
      </BrowserRouter>
    );
    await wrapper.instance().componentDidMount();
    await wrapper.update();

    expect(wrapper.find('ButtonLink').at(0).text()).toBe('Delete');
    wrapper.find('ButtonLink').at(0).simulate('click');
    expect(onClickDeleteButtonMock).toHaveBeenCalledTimes(1);
    expect(openModalMock).toHaveBeenCalledTimes(1);
    expect(openModalMock).toBeCalledWith(2);
  });
});
