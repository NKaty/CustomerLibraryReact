import { Field } from 'formik';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import {
  getNameWithNamespace,
  getPropertyWithNamespace,
} from '../../utils/convertFormNamespace';

const CustomerForm = ({ namespace, errors, touched }) => {
  const getName = getNameWithNamespace(namespace);
  const getProperty = getPropertyWithNamespace(namespace);

  return (
    <>
      <Field name="customerId" type="text" hidden />
      <Input
        displayName="First Name"
        isTouched={!!getProperty(touched, 'firstName')}
        fieldName={getName('firstName')}
        isError={!!getProperty(errors, 'firstName')}
      />
      <Input
        displayName="Last Name"
        isTouched={!!getProperty(touched, 'lastName')}
        fieldName={getName('lastName')}
        isError={!!getProperty(errors, 'lastName')}
      />
      <Input
        displayName="Phone number"
        isTouched={!!getProperty(touched, 'phoneNumber')}
        fieldName={getName('phoneNumber')}
        isError={!!getProperty(errors, 'phoneNumber')}
      />
      <Input
        displayName="Email"
        isTouched={!!getProperty(touched, 'email')}
        fieldName={getName('email')}
        isError={!!getProperty(errors, 'email')}
      />
      <Input
        displayName="Total Purchases Amount"
        isTouched={!!getProperty(touched, 'totalPurchasesAmount')}
        fieldName={getName('totalPurchasesAmount')}
        isError={!!getProperty(errors, 'totalPurchasesAmount')}
      />
    </>
  );
};

CustomerForm.propTypes = {
  namespace: PropTypes.object,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default CustomerForm;
