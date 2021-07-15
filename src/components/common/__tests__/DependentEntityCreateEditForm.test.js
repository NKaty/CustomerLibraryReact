import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import NoteForm from '../../notes/NoteForm';
import DependentEntityCreateEditFormFull, {
  DependentEntityCreateEditForm,
} from '../DependentEntityCreateEditForm';

describe('DependentEntityCreateEditForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const props = {
    match: { params: { customerId: 2, noteId: 1 } },
    entityProps: {
      validationSchema: {},
      initialState: { noteText: '', noteId: 0, customerId: 0 },
      formTitle: 'Note Form',
      idName: 'noteId',
      form: props => <NoteForm {...props} />,
      service: {
        getById: () => Promise.resolve({}),
        create: () => Promise.resolve({}),
        update: () => Promise.resolve({}),
      },
    },
  };

  it('should render a form', () => {
    const currentProps = {
      ...props,
      match: { params: { customerId: 2, noteId: 0 } },
    };
    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityCreateEditFormFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );

    expect(wrapper.find('NoteForm').length).toBe(1);
    expect(wrapper.find('CreateEditSubmitButtonGroup').length).toBe(1);
    wrapper.unmount();
  });

  it('should render a form in create mode', () => {
    const currentProps = {
      ...props,
      match: { params: { customerId: 2, noteId: 0 } },
    };
    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityCreateEditFormFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );

    expect(
      wrapper.find('DependentEntityCreateEditForm').instance().state.entity
        .noteText
    ).toBe('');
    expect(wrapper.find('NoteForm').length).toBe(1);
    wrapper.unmount();
  });

  it('should render a form in edit mode', async () => {
    const getByIdMock = () =>
      Promise.resolve({ noteId: 1, customerId: 2, noteText: 'Note1' });
    const currentProps = { ...props };
    currentProps.entityProps.service.getById = getByIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityCreateEditFormFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );
    await wrapper.instance().componentDidMount();
    wrapper.update();

    expect(
      wrapper.find('DependentEntityCreateEditForm').instance().state.entity
        .noteText
    ).toBe('Note1');
    expect(wrapper.find('NoteForm').length).toBe(1);
    wrapper.unmount();
  });

  it('should render an error message from server', async () => {
    const getByIdMock = () =>
      Promise.resolve({ error: true, errorTitle: 'Test' });
    const currentProps = { ...props };
    currentProps.entityProps.service.getById = getByIdMock;

    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityCreateEditFormFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );
    await wrapper.instance().componentDidMount();
    wrapper.update();

    expect(wrapper.find('Alert').length).toBe(1);
    expect(wrapper.find('Alert').text()).toBe('Test');
    wrapper.unmount();
  });

  it('should render a error message on invalid customerId', () => {
    const currentProps = {
      ...props,
      match: { params: { customerId: 'id', noteId: 0 } },
    };
    const wrapper = mount(
      <BrowserRouter>
        <DependentEntityCreateEditFormFull.WrappedComponent {...currentProps} />
      </BrowserRouter>
    );

    expect(wrapper.find('Alert').length).toBe(1);
    expect(wrapper.find('Alert').text()).toBe('Customer is not found.');
    wrapper.unmount();
  });

  it('should call close alert handler on update', () => {
    const currentProps = {
      ...props,
      match: { params: { customerId: 2, noteId: 0 } },
    };
    currentProps.onClickCancelButton = () => {};
    currentProps.onSubmit = () => {};
    currentProps.showAlert = () => {};
    const closeAlertMock = jest.fn(() => {});
    currentProps.closeAlert = closeAlertMock;

    const wrapper = shallow(
      <DependentEntityCreateEditForm {...currentProps} />
    );

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });
});
