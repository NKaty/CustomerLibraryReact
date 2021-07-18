import React from 'react';
import { mount, shallow } from 'enzyme';
import { CustomerFormPage } from '../CustomerFormPage';
import service from '../../../services/customer.service';
import { act } from 'react-dom/test-utils';
import customerInitialState from '../../../initialStates/customer.initialState';

jest.mock('../../../services/customer.service');

describe('DependentEntityCreateEditForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const props = {
    match: { params: { customerId: 0 } },
    showAlert: () => {},
    closeAlert: () => {},
    onClickCancelButton: () => {},
    onSubmit: () => {},
  };

  const customer = {
    customerId: 1,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    totalPurchasesAmount: '',
    addresses: [
      {
        addressId: 10,
        customerId: 1,
        addressLine: '',
        addressLine2: '',
        addressType: '',
        city: '',
        postalCode: '',
        state: '',
        country: '',
      },
      {
        addressId: 11,
        customerId: 1,
        addressLine: '',
        addressLine2: '',
        addressType: '',
        city: '',
        postalCode: '',
        state: '',
        country: '',
      },
    ],
    notes: [
      { noteId: 2, customerId: 1, noteText: '' },
      { noteId: 3, customerId: 1, noteText: '' },
    ],
  };

  it('should render a customer form with sub forms', async () => {
    service.getById.mockImplementation(() => Promise.resolve(customer));
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
    };

    let wrapper = mount(<CustomerFormPage {...currentProps} />);
    await act(async () => {
      await wrapper.instance().componentDidMount();
      await wrapper.update();
    });

    expect(wrapper.find('CustomerForm').length).toBe(1);
    expect(wrapper.find('NoteForm').length).toBe(2);
    expect(wrapper.find('AddressForm').length).toBe(2);
    expect(wrapper.find('CreateEditSubmitButtonGroup').length).toBe(1);
  });

  it('should render a customer form in create mode', () => {
    service.getById.mockImplementation(() => Promise.resolve());

    const wrapper = shallow(<CustomerFormPage {...props} />);

    expect(wrapper.instance().state).toStrictEqual({
      customer: customerInitialState,
      notesStartLength: 1,
      addressesStartLength: 1,
      isLoading: false,
      isLoaded: true,
    });
  });

  it('should render a customer form in create mode if there is no data from server', async () => {
    service.getById.mockImplementation(() => Promise.resolve());
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
    };

    const wrapper = shallow(<CustomerFormPage {...currentProps} />);
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      customer: customerInitialState,
      notesStartLength: 1,
      addressesStartLength: 1,
      isLoading: false,
      isLoaded: true,
    });
  });

  it('should render a customer form in edit mode', async () => {
    service.getById.mockImplementation(() => Promise.resolve(customer));
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
    };

    const wrapper = shallow(<CustomerFormPage {...currentProps} />);
    await wrapper.update();

    expect(wrapper.instance().state).toStrictEqual({
      customer: customer,
      notesStartLength: 2,
      addressesStartLength: 2,
      isLoading: false,
      isLoaded: true,
    });
  });

  it('should render an error message from server', async () => {
    service.getById.mockImplementation(() =>
      Promise.resolve({ error: true, errorTitle: 'Test' })
    );
    const showAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
      showAlert: showAlertMock,
    };

    const wrapper = shallow(<CustomerFormPage {...currentProps} />);
    await wrapper.update();

    expect(showAlertMock).toHaveBeenCalledTimes(1);
    expect(showAlertMock).toBeCalledWith('Test', 'error');
  });

  it('should call close alert handler and getById on update', () => {
    service.getById.mockImplementation(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
      closeAlert: closeAlertMock,
    };

    const wrapper = shallow(<CustomerFormPage {...currentProps} />);

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(1);
    expect(service.getById).toHaveBeenCalledTimes(2);
  });

  it('should not call close alert handler and getById on update if isLoaded is true', () => {
    service.getById.mockImplementation(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
      closeAlert: closeAlertMock,
    };

    const wrapper = shallow(<CustomerFormPage {...currentProps} />);

    wrapper.instance().state.isLoaded = true;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(0);
    expect(service.getById).toHaveBeenCalledTimes(1);
  });

  it('should not call close alert handler and getById on update if isLoading is true', () => {
    service.getById.mockImplementation(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
      closeAlert: closeAlertMock,
    };

    const wrapper = shallow(<CustomerFormPage {...currentProps} />);

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = true;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(0);
    expect(service.getById).toHaveBeenCalledTimes(1);
  });

  it('should call only close alert handler on update', () => {
    service.getById.mockImplementation(() => Promise.resolve());
    const closeAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      closeAlert: closeAlertMock,
    };

    const wrapper = shallow(<CustomerFormPage {...currentProps} />);

    wrapper.instance().state.isLoaded = false;
    wrapper.instance().state.isLoading = false;
    wrapper.setProps({});
    expect(closeAlertMock).toHaveBeenCalledTimes(1);
    expect(service.getById).toHaveBeenCalledTimes(0);
  });

  it('should render an alert', async () => {
    service.getById.mockImplementation(() => Promise.resolve());
    const currentProps = {
      ...props,
      message: 'Error',
    };
    const wrapper = shallow(<CustomerFormPage {...currentProps} />);
    await wrapper.update();

    expect(wrapper.find('Alert').length).toBe(1);
  });

  it('should add and remove address sub form on add and remove button clicks in create mode', async () => {
    service.getById.mockImplementation(() => Promise.resolve());

    let wrapper = mount(<CustomerFormPage {...props} />);

    expect(wrapper.find('CustomerForm').length).toBe(1);
    expect(wrapper.find('AddressForm').length).toBe(1);

    expect(wrapper.find('button').at(0).text()).toBe('+');
    await act(async () => {
      await wrapper.find('button').at(0).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('AddressForm').length).toBe(2);

    expect(wrapper.find('button').at(1).text()).toBe('-');
    await act(async () => {
      await wrapper.find('button').at(1).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('AddressForm').length).toBe(1);
  });

  it('should not remove address sub form if address length equals start address length in create mode', async () => {
    service.getById.mockImplementation(() => Promise.resolve());

    let wrapper = mount(<CustomerFormPage {...props} />);

    expect(wrapper.find('CustomerForm').length).toBe(1);
    expect(wrapper.find('AddressForm').length).toBe(1);

    expect(wrapper.find('button').at(1).text()).toBe('-');
    expect(wrapper.find('button').at(1).getDOMNode().disabled).toBe(true);
    await act(async () => {
      await wrapper.find('button').at(1).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('AddressForm').length).toBe(1);
  });

  it('should add and remove note sub form on add and remove button clicks in create mode', async () => {
    service.getById.mockImplementation(() => Promise.resolve());

    let wrapper = mount(<CustomerFormPage {...props} />);

    expect(wrapper.find('CustomerForm').length).toBe(1);
    expect(wrapper.find('NoteForm').length).toBe(1);

    expect(wrapper.find('button').at(2).text()).toBe('+');
    await act(async () => {
      await wrapper.find('button').at(2).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('NoteForm').length).toBe(2);

    expect(wrapper.find('button').at(3).text()).toBe('-');
    await act(async () => {
      await wrapper.find('button').at(3).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('NoteForm').length).toBe(1);
  });

  it('should not remove note sub form if note length equals start note length in create mode', async () => {
    service.getById.mockImplementation(() => Promise.resolve());
    const showAlertMock = jest.fn(() => {});
    const currentProps = {
      ...props,
      showAlert: showAlertMock,
    };

    let wrapper = mount(<CustomerFormPage {...currentProps} />);

    expect(wrapper.find('CustomerForm').length).toBe(1);
    expect(wrapper.find('NoteForm').length).toBe(1);
    expect(wrapper.find('button').at(3).getDOMNode().disabled).toBe(true);

    expect(wrapper.find('button').at(3).text()).toBe('-');
    await act(async () => {
      await wrapper.find('button').at(3).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('NoteForm').length).toBe(1);
  });

  it('should add and remove address sub form on add and remove button clicks in edit mode', async () => {
    service.getById.mockImplementation(() => Promise.resolve(customer));
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
    };

    let wrapper = mount(<CustomerFormPage {...currentProps} />);
    await act(async () => {
      await wrapper.instance().componentDidMount();
      await wrapper.update();
    });

    expect(wrapper.find('CustomerForm').length).toBe(1);
    expect(wrapper.find('AddressForm').length).toBe(2);

    expect(wrapper.find('button').at(0).text()).toBe('+');
    await act(async () => {
      await wrapper.find('button').at(0).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('AddressForm').length).toBe(3);

    expect(wrapper.find('button').at(1).text()).toBe('-');
    await act(async () => {
      await wrapper.find('button').at(1).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('AddressForm').length).toBe(2);
  });

  it('should not remove address sub form if address length equals start address length in edit mode', async () => {
    service.getById.mockImplementation(() => Promise.resolve(customer));
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
    };

    let wrapper = mount(<CustomerFormPage {...currentProps} />);
    await act(async () => {
      await wrapper.instance().componentDidMount();
      await wrapper.update();
    });

    expect(wrapper.find('CustomerForm').length).toBe(1);
    expect(wrapper.find('AddressForm').length).toBe(2);

    expect(wrapper.find('button').at(1).text()).toBe('-');
    expect(wrapper.find('button').at(1).getDOMNode().disabled).toBe(true);
    await act(async () => {
      await wrapper.find('button').at(1).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('AddressForm').length).toBe(2);
  });

  it('should add and remove note sub form on add and remove button clicks in edit mode', async () => {
    service.getById.mockImplementation(() => Promise.resolve(customer));
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
    };

    let wrapper = mount(<CustomerFormPage {...currentProps} />);
    await act(async () => {
      await wrapper.instance().componentDidMount();
      await wrapper.update();
    });

    expect(wrapper.find('CustomerForm').length).toBe(1);
    expect(wrapper.find('NoteForm').length).toBe(2);

    expect(wrapper.find('button').at(2).text()).toBe('+');
    await act(async () => {
      await wrapper.find('button').at(2).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('NoteForm').length).toBe(3);

    expect(wrapper.find('button').at(3).text()).toBe('-');
    await act(async () => {
      await wrapper.find('button').at(3).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('NoteForm').length).toBe(2);
  });

  it('should not remove note sub form if note length equals start note length in edit mode', async () => {
    service.getById.mockImplementation(() => Promise.resolve(customer));
    const currentProps = {
      ...props,
      match: { params: { customerId: 1 } },
    };

    let wrapper = mount(<CustomerFormPage {...currentProps} />);
    await act(async () => {
      await wrapper.instance().componentDidMount();
      await wrapper.update();
    });

    expect(wrapper.find('CustomerForm').length).toBe(1);
    expect(wrapper.find('NoteForm').length).toBe(2);

    expect(wrapper.find('button').at(3).text()).toBe('-');
    expect(wrapper.find('button').at(3).getDOMNode().disabled).toBe(true);
    await act(async () => {
      await wrapper.find('button').at(3).simulate('click');
      await wrapper.update();
    });

    expect(wrapper.find('NoteForm').length).toBe(2);
  });

  it('should getCustomerId return a correct current customer id', async () => {
    service.getById.mockImplementation(() => Promise.resolve());

    const wrapper = shallow(<CustomerFormPage {...props} />);

    const instance = wrapper.instance();
    instance.props.match.params.customerId = 10;
    expect(instance.getCustomerId()).toBe(10);
    instance.props.match.params.customerId = 0;
    expect(instance.getCustomerId()).toBe(0);
    instance.props.match.params.customerId = 'null';
    expect(instance.getCustomerId()).toBe(0);
  });
});
