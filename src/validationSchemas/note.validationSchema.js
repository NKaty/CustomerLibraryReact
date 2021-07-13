import * as Yup from 'yup';

const noteSchema = Yup.object().shape({
  noteText: Yup.string()
    .required('The field is required.')
    .max(500, 'The field length must be at most 500 characters long.'),
});

export default noteSchema;
