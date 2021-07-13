import { Field } from 'formik';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Select from '../common/Select';
import {
  getNameWithNamespace,
  getPropertyWithNamespace,
} from '../../utils/convertFormNamespace';

const AddressForm = ({ namespace, errors, touched }) => {
  const getName = getNameWithNamespace(namespace);
  const getProperty = getPropertyWithNamespace(namespace);

  return (
    <>
      <Field name="customerId" type="text" hidden />
      <Field name="addressId" type="text" hidden />
      <Input
        displayName="Address Line"
        isTouched={!!getProperty(touched, 'addressLine')}
        fieldName={getName('addressLine')}
        isError={!!getProperty(errors, 'addressLine')}
      />
      <Input
        displayName="Address Line2"
        isTouched={!!getProperty(touched, 'addressLine2')}
        fieldName={getName('addressLine2')}
        isError={!!getProperty(errors, 'addressLine2')}
      />
      <Select
        displayName="Address Type"
        isTouched={!!getProperty(touched, 'addressType')}
        fieldName={getName('addressType')}
        isError={!!getProperty(errors, 'addressType')}
        options={['', 'Shipping', 'Billing']}
      />
      <Input
        displayName="City"
        isTouched={!!getProperty(touched, 'city')}
        fieldName={getName('city')}
        isError={!!getProperty(errors, 'city')}
      />
      <Input
        displayName="Postal Code"
        isTouched={!!getProperty(touched, 'postalCode')}
        fieldName={getName('postalCode')}
        isError={!!getProperty(errors, 'postalCode')}
      />
      <Input
        displayName="State"
        isTouched={!!getProperty(touched, 'state')}
        fieldName={getName('state')}
        isError={!!getProperty(errors, 'state')}
      />
      <Select
        displayName="Country"
        isTouched={!!getProperty(touched, 'country')}
        fieldName={getName('country')}
        isError={!!getProperty(errors, 'country')}
        options={['', 'United States', 'Canada']}
      />
    </>
  );
};

AddressForm.propTypes = {
  namespace: PropTypes.object,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default AddressForm;
