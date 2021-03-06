import * as Yup from 'yup';
import noteSchema from './note.validationSchema';
import addressSchema from './address.validationSchema';

const customerSchema = Yup.object().shape({
  firstName: Yup.string().max(
    50,
    'The field length must be at most 50 characters long.'
  ),
  lastName: Yup.string()
    .required('The field is required.')
    .max(50, 'The field length must be at most 50 characters long.'),
  phoneNumber: Yup.string().matches(
    /^\+[1-9]\d{1,14}$/,
    'The phone number is invalid.'
  ),
  email: Yup.string().nullable().email('The email is invalid.'),
  totalPurchasesAmount: Yup.number().typeError('The field must be a number.'),
  notes: Yup.array().of(noteSchema).min(1, 'Must be at least one note.'),
  addresses: Yup.array()
    .of(addressSchema)
    .min(1, 'Must be at least one address.'),
});

export default customerSchema;
