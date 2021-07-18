import React from 'react';
import { mount, shallow } from 'enzyme';
import { DependentEntityCreateEditForm } from '../DependentEntityCreateEditForm';

describe('DependentEntityCreateEditForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  let props;
  beforeEach(() => {
    const MockedForm = () => null;
    props = {
      match: { params: { customerId: 2, noteId: 1 } },
      showAlert: () => {},
      closeAlert: () => {},
      onClickCancelButton: () => {},
      onSubmit: () => {},
      entityProps: {
        initialState: { noteText: '', noteId: 0, customerId: 0 },
        formTitle: 'Note Form',
        idName: 'noteId',
        form: props => <MockedForm {...props} />,
        service: {
          getById: () => Promise.resolve({}),
          create: () => Promise.resolve({}),
          update: () => Promise.resolve({}),
        },
      },
    };
  });

  it('should render a form', async () => {
    const currentProps = {
      ...props,
      match: { params: { customerId: 2, noteId: 0 } },
    };
    const wrapper = mount(<DependentEntityCreateEditForm {...currentProps} />);

    expect(wrapper.find('MockedForm').length).toBe(1);
    expect(wrapper.find('CreateEditSubmitButtonGroup').length).toBe(1);
  });

  it('should render a form in create mode', async () => {
    const currentProps = {
      ...props,
      match: { params: { customerId: 2, noteId: 0 } },
    };
    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      entity: {
        noteText: '',
        customerId: 2,
        noteId: 0,
      },
      isLoading: false,
      isLoaded: true,
    });
  });

  it('should render a form in create mode if there is no data from server', async () => {
    const getByIdMock = () => Promise.resolve();
    const currentProps = {
      ...props,
      match: { params: { customerId: 2, noteId: 1 } },
    };
    currentProps.entityProps.service.getById = getByIdMock;

    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      entity: {
        noteText: '',
        customerId: 2,
        noteId: 0,
      },
      isLoading: false,
      isLoaded: true,
    });
  });

  it('should render a form in edit mode', async () => {
    const getByIdMock = () =>
      Promise.resolve({ noteId: 1, customerId: 2, noteText: 'Note1' });
    const currentProps = { ...props };
    currentProps.entityProps.service.getById = getByIdMock;

    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      entity: {
        noteText: 'Note1',
        customerId: 2,
        noteId: 1,
      },
      isLoading: false,
      isLoaded: true,
    });
  });

  it('should render an error message from server', async () => {
    const getByIdMock = () =>
      Promise.resolve({ error: true, errorTitle: 'Test' });
    const showAlertMock = jest.fn(() => {});
    const currentProps = { ...props, showAlert: showAlertMock };
    currentProps.entityProps.service.getById = getByIdMock;

    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );
    await wrapper.update();

    expect(showAlertMock).toHaveBeenCalledTimes(1);
    expect(showAlertMock).toBeCalledWith('Test', 'error');
  });

  it('should render a error message on invalid customerId', async () => {
    const showAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 'id', noteId: 0 } },
      showAlert: showAlertMock,
    };

    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );
    await wrapper.update();

    expect(showAlertMock).toHaveBeenCalledTimes(1);
    expect(showAlertMock).toBeCalledWith('Customer is not found.', 'error');
  });

  it('should call close alert handler and getById on update', () => {
    const getByIdMock = jest.fn(() =>
      Promise.resolve({ noteId: 1, customerId: 2, noteText: 'Note1' })
    );
    const closeAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 2, noteId: 1 } },
      closeAlert: closeAlertMock,
    };
    currentProps.entityProps.service.getById = getByIdMock;

    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(1);
    expect(getByIdMock).toHaveBeenCalledTimes(2);
  });

  it('should not call close alert handler and getById on update if isLoaded is true', () => {
    const getByIdMock = jest.fn(() =>
      Promise.resolve({ noteId: 1, customerId: 2, noteText: 'Note1' })
    );
    const closeAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 2, noteId: 1 } },
      closeAlert: closeAlertMock,
    };
    currentProps.entityProps.service.getById = getByIdMock;

    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );

    wrapper.instance().state.isLoaded = true;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(0);
    expect(getByIdMock).toHaveBeenCalledTimes(1);
  });

  it('should not call close alert handler and getById on update if isLoading is true', () => {
    const getByIdMock = jest.fn(() =>
      Promise.resolve({ noteId: 1, customerId: 2, noteText: 'Note1' })
    );
    const closeAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 2, noteId: 1 } },
      closeAlert: closeAlertMock,
    };
    currentProps.entityProps.service.getById = getByIdMock;

    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = true;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(0);
    expect(getByIdMock).toHaveBeenCalledTimes(1);
  });

  it('should call only close alert handler on update', () => {
    const getByIdMock = jest.fn(() => {});
    const closeAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 0, noteId: 0 } },
      closeAlert: closeAlertMock,
    };
    currentProps.entityProps.service.getById = getByIdMock;

    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(1);
    expect(getByIdMock).toHaveBeenCalledTimes(0);
  });
});
