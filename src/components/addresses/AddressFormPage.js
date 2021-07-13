import AddressForm from './AddressForm';
import DependentEntityCreateEditForm from '../common/DependentEntityCreateEditForm';
import addressService from '../../services/address.service';
import addressValidationSchema from '../../validationSchemas/address.validationSchema';
import addressInitialState from '../../initialStates/address.initialState';

const AddressFormPage = () => {
  const getFormProps = () => {
    return {
      service: addressService,
      validationSchema: addressValidationSchema,
      initialState: addressInitialState,
      formTitle: 'Address Form',
      idName: 'addressId',
      form: props => <AddressForm {...props} />,
    };
  };

  return <DependentEntityCreateEditForm entityProps={getFormProps()} />;
};

export default AddressFormPage;
