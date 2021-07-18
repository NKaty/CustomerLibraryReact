import addressInitialState from './address.initialState';
import noteInitialState from './note.initialState';

const customerInitialState = {
  customerId: 0,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  totalPurchasesAmount: '',
  addresses: [{ ...addressInitialState }],
  notes: [{ ...noteInitialState }],
};

export default customerInitialState;
