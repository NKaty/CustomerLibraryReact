import React from 'react';
import { mount, shallow } from 'enzyme';
import DependentEntityListFull, {
  DependentEntityList,
} from '../DependentEntityList';
import { BrowserRouter } from 'react-router-dom';

describe('DependentEntityList', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const props = {
    location: { pathname: '/' },
    match: { params: { customerId: 2 } },
    history: {},
    entityProps: {
      name: 'notes',
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
    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityListFull.WrappedComponent {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find('Spinner').length).toBe(1);
  });

  it('should render an entity table', async () => {
    const getByCustomerIdMock = () =>
      Promise.resolve([{ noteId: 1, customerId: 2, noteText: 'Note1' }]);
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityListFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );

    await wrapper.instance().componentDidMount();
    wrapper.update();

    expect(wrapper.find('table').length).toBe(1);
    expect(
      wrapper.find('DependentEntityList').instance().state.entities[0].noteText
    ).toBe('Note1');
    expect(wrapper.find('table td').at(1).find('PrimaryLink').text()).toBe(
      'Edit'
    );
    expect(wrapper.find('table td').at(1).find('PrimaryLink').prop('to')).toBe(
      '/edit/1/'
    );
    expect(wrapper.find('table td').at(1).find('ButtonLink').text()).toBe(
      'Delete'
    );
    expect(wrapper.find('PrimaryLink').at(0).text()).toBe('Create New');
    expect(wrapper.find('PrimaryLink').at(0).prop('to')).toBe('/create/');
  });

  it('should render an error message from server', async () => {
    const getByCustomerIdMock = () =>
      Promise.resolve({ error: true, errorTitle: 'Test' });
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityListFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );

    await wrapper.instance().componentDidMount();
    wrapper.update();

    expect(wrapper.find('Alert').length).toBe(1);
    expect(wrapper.find('Alert').text()).toBe('Test');
  });

  it('should render an error message on invalid customerId', () => {
    const currentProps = { ...props, match: { params: { customerId: 'id' } } };

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityListFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );

    expect(wrapper.find('Alert').length).toBe(1);
    expect(wrapper.find('Alert').text()).toBe('Customer is not found.');
  });

  it('should call handler on return button click', () => {
    const goBackMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 'id' } },
      history: { goBack: goBackMock },
    };

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityListFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );

    expect(wrapper.find('ButtonLink').at(0).text()).toBe('Return to Customers');
    wrapper.find('ButtonLink').at(0).simulate('click');
    expect(goBackMock).toHaveBeenCalledTimes(1);
  });

  it('should close the error message on close button click', async () => {
    const getByCustomerIdMock = () =>
      Promise.resolve({ error: true, errorTitle: 'Test' });
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityListFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );

    await wrapper.instance().componentDidMount();
    wrapper.update();
    expect(wrapper.find('Alert').length).toBe(1);
  });

  it('should open a delete modal', async () => {
    const getByCustomerIdMock = () =>
      Promise.resolve([
        { noteId: 1, customerId: 2, noteText: 'Note1' },
        { noteId: 2, customerId: 2, noteText: 'Note2' },
      ]);
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityListFull.WrappedComponent {...currentProps} />)
      </BrowserRouter>
    );

    await wrapper.instance().componentDidMount();
    wrapper.update();
    wrapper.find('table td').at(1).find('ButtonLink').simulate('click');
    expect(wrapper.find('Modal').length).toBe(1);
  });

  it('should not open a delete modal for the last entity', async () => {
    const getByCustomerIdMock = jest.fn(() =>
      Promise.resolve([{ noteId: 1, customerId: 2, noteText: 'Note1' }])
    );
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityListFull.WrappedComponent {...currentProps} />)
      </BrowserRouter>
    );

    await wrapper.instance().componentDidMount();
    wrapper.update();
    wrapper.find('table td').at(1).find('ButtonLink').simulate('click');
    expect(wrapper.find('Modal').length).toBe(0);
  });

  it('should call delete handler', async () => {
    const getByCustomerIdMock = () =>
      Promise.resolve([
        { noteId: 1, customerId: 2, noteText: 'Note1' },
        { noteId: 2, customerId: 2, noteText: 'Note2' },
      ]);
    const deleteMock = jest.fn(() => Promise.resolve({}));
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = getByCustomerIdMock;
    currentProps.entityProps.service.delete = deleteMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityListFull.WrappedComponent {...currentProps} />)
      </BrowserRouter>
    );

    await wrapper.instance().componentDidMount();
    wrapper.update();
    wrapper.find('table td').at(1).find('ButtonLink').simulate('click');
    expect(wrapper.find('Modal').length).toBe(1);
    wrapper.find('Modal .modal-footer button').at(1).simulate('click');
    expect(deleteMock).toHaveBeenCalledTimes(1);
  });

  it('should call close alert handler on update', async () => {
    const currentProps = { ...props };
    currentProps.entityProps.service.getByCustomerId = () =>
      Promise.resolve([{ noteId: 1, customerId: 2, noteText: 'Note1' }]);
    currentProps.isModalOpen = false;
    currentProps.openModal = () => () => {};
    currentProps.showAlert = () => {};
    currentProps.onClickModalCancelButton = () => {};
    currentProps.onClickModalDeleteButton = () => {};
    const closeAlertMock = jest.fn(() => {});
    currentProps.closeAlert = closeAlertMock;

    const wrapper = shallow(<DependentEntityList {...currentProps} />);
    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});

    expect(closeAlertMock).toHaveBeenCalledTimes(1);
  });
});
