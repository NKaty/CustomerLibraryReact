import * as Yup from 'yup';

const addressSchema = Yup.object().shape({
  addressLine: Yup.string()
    .required('The field is required.')
    .max(100, 'The field length must be at most 100 characters long.'),
  addressLine2: Yup.string().max(
    100,
    'The field length must be at most 100 characters long.'
  ),
  addressType: Yup.string()
    .required('The field is required.')
    .oneOf(
      ['Shipping', 'Billing'],
      'The valid values for the field are Shipping and Billing.'
    ),
  city: Yup.string()
    .required('The field is required.')
    .max(50, 'The field length must be at most 50 characters long.'),
  postalCode: Yup.string()
    .required('The field is required.')
    .max(6, 'The field length must be at most 6 characters long.'),
  state: Yup.string()
    .required('The field is required.')
    .max(20, 'The field length must be at most 20 characters long.'),
  country: Yup.string()
    .required('The field is required.')
    .oneOf(
      ['United States', 'Canada'],
      'The valid values for the field are United States and Canada.'
    ),
});

export default addressSchema;
