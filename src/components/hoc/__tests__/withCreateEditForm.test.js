import React from 'react';
import { shallow } from 'enzyme';
import withCreateEditForm from '../withCreateEditForm';

describe('DependentEntityList', () => {
  let WithCreateEditFormComponent;
  let showAlert;
  let setFieldError;
  let setStatus;
  let setSubmitting;
  let history = {};
  let goBack;
  let fields = { noteText: 'Note1' };

  beforeEach(() => {
    const mockedComponent = jest.fn();
    WithCreateEditFormComponent = withCreateEditForm(mockedComponent);
    showAlert = jest.fn(() => {});
    setFieldError = jest.fn(() => {});
    setStatus = jest.fn(() => {});
    setSubmitting = jest.fn(() => {});
    setSubmitting = jest.fn(() => {});
    goBack = jest.fn(() => {});
    history.goBack = goBack;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call service.create and history.goBack on success', async () => {
    const create = jest.fn(() => Promise.resolve());
    const service = { create };

    const wrapper = shallow(<WithCreateEditFormComponent history={history} />);

    const onSubmitFn = wrapper.props().onSubmit(0, service);
    await onSubmitFn(fields, { setStatus, setSubmitting, setFieldError });

    expect(setStatus).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledTimes(1);
    expect(goBack).toHaveBeenCalledTimes(1);
  });

  it('should call service.update and history.goBack on success', async () => {
    const update = jest.fn(() => Promise.resolve());
    const service = { update };

    const wrapper = shallow(<WithCreateEditFormComponent history={history} />);

    const onSubmitFn = wrapper.props().onSubmit(10, service);
    await onSubmitFn(fields, { setStatus, setSubmitting, setFieldError });

    expect(setStatus).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(1);
    expect(goBack).toHaveBeenCalledTimes(1);
  });

  it('should call service.create and showError on failure (common error)', async () => {
    const create = jest.fn(() =>
      Promise.resolve({ error: true, errorTitle: 'Error' })
    );
    const service = { create };

    const wrapper = shallow(
      <WithCreateEditFormComponent showAlert={showAlert} />
    );

    const onSubmitFn = wrapper.props().onSubmit(0, service);
    await onSubmitFn(fields, { setStatus, setSubmitting, setFieldError });

    expect(create).toHaveBeenCalledTimes(1);
    expect(setSubmitting).toHaveBeenCalledTimes(1);
    expect(showAlert).toHaveBeenCalledTimes(1);
    expect(showAlert).toBeCalledWith('Error', 'error');
  });

  it('should call service.create and showError on failure (empty field error)', async () => {
    const error = {
      validationErrors: {
        '': ['Error'],
      },
    };
    const create = jest.fn(() => Promise.resolve({ error: true, ...error }));
    const service = { create };

    const wrapper = shallow(
      <WithCreateEditFormComponent showAlert={showAlert} />
    );

    const onSubmitFn = wrapper.props().onSubmit(0, service);
    await onSubmitFn(fields, { setStatus, setSubmitting, setFieldError });

    expect(create).toHaveBeenCalledTimes(1);
    expect(setSubmitting).toHaveBeenCalledTimes(1);
    expect(showAlert).toHaveBeenCalledTimes(1);
    expect(showAlert).toBeCalledWith('Error', 'error');
  });

  it('should call service.create and setFieldError on failure (validation errors)', async () => {
    const error = {
      validationErrors: {
        NoteText: ['Note is required.'],
      },
    };
    const create = jest.fn(() => Promise.resolve({ error: true, ...error }));
    const service = { create };

    const wrapper = shallow(
      <WithCreateEditFormComponent showAlert={showAlert} />
    );

    const onSubmitFn = wrapper.props().onSubmit(0, service);
    await onSubmitFn(fields, { setStatus, setSubmitting, setFieldError });

    expect(create).toHaveBeenCalledTimes(1);
    expect(setSubmitting).toHaveBeenCalledTimes(1);
    expect(setFieldError).toHaveBeenCalledTimes(1);
  });

  it('should call service.update and showError on failure', async () => {
    const update = jest.fn(() =>
      Promise.resolve({ error: true, errorTitle: 'Error' })
    );
    const service = { update };

    const wrapper = shallow(
      <WithCreateEditFormComponent showAlert={showAlert} />
    );

    const onSubmitFn = wrapper.props().onSubmit(10, service);
    await onSubmitFn(fields, { setStatus, setSubmitting, setFieldError });

    expect(update).toHaveBeenCalledTimes(1);
    expect(setSubmitting).toHaveBeenCalledTimes(1);
    expect(showAlert).toHaveBeenCalledTimes(1);
    expect(showAlert).toBeCalledWith('Error', 'error');
  });

  it('should call history.goBack on cancel button click', () => {
    const wrapper = shallow(<WithCreateEditFormComponent history={history} />);

    wrapper.props().onClickCancelButton({
      preventDefault: () => {},
    });

    expect(goBack).toHaveBeenCalledTimes(1);
  });
});
