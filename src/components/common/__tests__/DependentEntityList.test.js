import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { DependentEntityList } from '../DependentEntityList';

describe('DependentEntityList', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const props = {
    location: { pathname: '/notes/' },
    match: { params: { customerId: 2 } },
    isModalOpen: false,
    openModal: () => () => {},
    showAlert: () => {},
    closeAlert: () => {},
    onClickModalCancelButton: () => {},
    onClickModalDeleteButton: () => () => {},
    history: {},
    entityProps: {
      name: 'note',
      service: {
        getByCustomerId: () => Promise.resolve([{}]),
      },
      listTitle: 'Notes',
      idName: 'noteId',
      columns: [
        { name: 'noteText', displayName: 'Note' },
        { name: 'actions', displayName: 'Actions' },
      ],
    },
  };

  it('should render a spinner', () => {
    const wrapper = shallow(<DependentEntityList {...props} />);
    expect(wrapper.find('Spinner').length).toBe(1);
  });

  it('should render an entity table', async () => {
    const wrapper = shallow(<DependentEntityList {...props} />);
    await wrapper.update();

    expect(wrapper.find('Table').length).toBe(1);
  });

  it('should render a correct title', async () => {
    const wrapper = shallow(<DependentEntityList {...props} />);
    await wrapper.update();

    expect(wrapper.find('h2').text()).toBe('Notes');

    wrapper.setProps({ location: { pathname: '/notes/', state: 'Bob Smith' } });
    expect(wrapper.find('h2').text()).toBe('Notes for customer Bob Smith');
  });

  it('should render an alert', async () => {
    const currentProps = {
      ...props,
      message: 'Error',
    };

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    expect(wrapper.find('Alert').length).toBe(1);
  });

  it('should call showAlert for a message from server', async () => {
    const getByCustomerIdMock = () =>
      Promise.resolve({ error: true, errorTitle: 'Test' });
    const showAlertMock = jest.fn(() => {});
    const currentProps = { ...props, showAlert: showAlertMock };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    expect(showAlertMock).toHaveBeenCalledTimes(1);
    expect(showAlertMock).toBeCalledWith('Test', 'error');
  });

  it('should call showAlert for an invalid customerId', async () => {
    const showAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      showAlert: showAlertMock,
      match: { params: { customerId: 'id' } },
    };

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    expect(showAlertMock).toHaveBeenCalledTimes(1);
    expect(showAlertMock).toBeCalledWith('Customer is not found.', 'error');
  });

  it('should render an delete modal', async () => {
    const currentProps = {
      ...props,
      isModalOpen: true,
    };

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    expect(wrapper.find('Modal').length).toBe(1);
  });

  it('should render a create customer link', async () => {
    const wrapper = shallow(<DependentEntityList {...props} />);
    await wrapper.update();

    expect(wrapper.find('PrimaryLink').props().to).toBe('/notes/create/');
  });

  it('should set state for empty response', async () => {
    const getByCustomerIdMock = jest.fn(() => Promise.resolve());
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      entities: [],
      isLoading: false,
      isLoaded: true,
    });
    expect(getByCustomerIdMock).toHaveBeenCalledTimes(1);
  });

  it('should set state for response with data', async () => {
    const getByCustomerIdMock = jest.fn(() =>
      Promise.resolve([{ noteId: 1, customerId: 2, noteText: 'Note1' }])
    );
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;
    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      entities: [{ noteId: 1, customerId: 2, noteText: 'Note1' }],
      isLoading: false,
      isLoaded: true,
    });
    expect(getByCustomerIdMock).toHaveBeenCalledTimes(1);
  });

  it('should set state for response with error', async () => {
    const getByCustomerIdMock = jest.fn(() =>
      Promise.resolve({ error: true, errorTitle: 'Test' })
    );
    const showAlertMock = jest.fn(() => {});
    const currentProps = { ...props, showAlert: showAlertMock };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      entities: [],
      isLoading: false,
      isLoaded: true,
    });
    expect(getByCustomerIdMock).toHaveBeenCalledTimes(1);
    expect(showAlertMock).toHaveBeenCalledTimes(1);
  });

  it('should call close alert message and getByCustomerId method on update', async () => {
    const getByCustomerIdMock = jest.fn(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = { ...props, closeAlert: closeAlertMock };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(1);
    expect(getByCustomerIdMock).toHaveBeenCalledTimes(2);
  });

  it('should not call close alert message and getByCustomerId method on update if isLoaded is true', async () => {
    const getByCustomerIdMock = jest.fn(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = { ...props, closeAlert: closeAlertMock };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    wrapper.instance().state.isLoaded = true;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(0);
    expect(getByCustomerIdMock).toHaveBeenCalledTimes(1);
  });

  it('should not call close alert message and getByCustomerId method on update if isLoading is true', async () => {
    const getByCustomerIdMock = jest.fn(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = { ...props, closeAlert: closeAlertMock };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = true;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(0);
    expect(getByCustomerIdMock).toHaveBeenCalledTimes(1);
  });

  it('should return correct delete modal props', async () => {
    const getByCustomerIdMock = () => Promise.resolve();
    const onClickModalDeleteButtonMock = jest.fn();
    const currentProps = {
      ...props,
      onClickModalDeleteButton: onClickModalDeleteButtonMock,
    };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    await wrapper.update();
    const errorModalProps = wrapper.instance().getDeleteModalProps();
    delete errorModalProps.onAction;
    errorModalProps.onCancel = errorModalProps.onCancel.name;

    expect(errorModalProps).toStrictEqual({
      title: 'Delete note',
      body: 'Are you sure you want to delete this note?',
      cancelButtonLabel: 'Cancel',
      actionButtonLabel: 'Delete',
      onCancel: 'onClickModalCancelButton',
    });
    expect(onClickModalDeleteButtonMock).toHaveBeenCalledTimes(1);
  });

  it('should call goBack on return button click', async () => {
    const goBackMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 'id' } },
      history: { goBack: goBackMock },
    };

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityList {...currentProps} />
      </BrowserRouter>
    );

    await wrapper.update();

    expect(wrapper.find('ButtonLink').text()).toBe('Return to Customers');
    wrapper.find('ButtonLink').simulate('click');
    expect(goBackMock).toHaveBeenCalledTimes(1);
  });

  it('should render correct link for edit', async () => {
    const getByCustomerIdMock = jest.fn(() =>
      Promise.resolve([{ noteId: 1, customerId: 2, noteText: 'Note1' }])
    );
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityList {...props} />
      </BrowserRouter>
    );
    await wrapper.instance().componentDidMount();
    await wrapper.update();

    expect(wrapper.find('PrimaryLink').at(1).text()).toBe('Edit');
    expect(wrapper.find('PrimaryLink').at(1).props().to).toStrictEqual(
      '/notes/edit/1/'
    );
  });

  it('should delete button open a delete modal', async () => {
    const getByCustomerIdMock = () =>
      Promise.resolve([
        { noteId: 1, customerId: 2, noteText: 'Note1' },
        { noteId: 2, customerId: 2, noteText: 'Note2' },
      ]);
    const onClickDeleteButtonMock = jest.fn(() => {});
    const openModalMock = jest.fn(() => onClickDeleteButtonMock);
    const currentProps = { ...props, openModal: openModalMock };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityList {...currentProps} />
      </BrowserRouter>
    );
    await wrapper.instance().componentDidMount();
    await wrapper.update();

    expect(wrapper.find('ButtonLink').at(1).text()).toBe('Delete');
    wrapper.find('ButtonLink').at(1).simulate('click');
    expect(onClickDeleteButtonMock).toHaveBeenCalledTimes(1);
    expect(openModalMock).toHaveBeenCalledTimes(2);
    expect(openModalMock).toBeCalledWith(1);
  });

  it('should not delete button open a delete modal for the last entity', async () => {
    const getByCustomerIdMock = () =>
      Promise.resolve([{ noteId: 1, customerId: 2, noteText: 'Note1' }]);
    const onClickDeleteButtonMock = jest.fn(() => {});
    const openModalMock = jest.fn(() => onClickDeleteButtonMock);
    const currentProps = { ...props, openModal: openModalMock };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityList {...currentProps} />
      </BrowserRouter>
    );
    await wrapper.instance().componentDidMount();
    await wrapper.update();

    expect(wrapper.find('ButtonLink').at(1).text()).toBe('Delete');
    wrapper.find('ButtonLink').at(1).simulate('click');
    expect(onClickDeleteButtonMock).toHaveBeenCalledTimes(0);
    expect(openModalMock).toHaveBeenCalledTimes(1);
    expect(openModalMock).toBeCalledWith(1);
  });
});
