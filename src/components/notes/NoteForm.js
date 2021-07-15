import { Field } from 'formik';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import {
  getNameWithNamespace,
  getPropertyWithNamespace,
} from '../../utils/convertFormNamespace';

const NoteForm = ({ namespace, errors, touched }) => {
  const getName = getNameWithNamespace(namespace);
  const getProperty = getPropertyWithNamespace(namespace);

  return (
    <>
      <Field name={getName('customerId')} type="text" hidden />
      <Field name={getName('noteId')} type="text" hidden />
      <Input
        displayName="Note"
        isTouched={!!getProperty(touched, 'noteText')}
        fieldName={getName('noteText')}
        isError={!!getProperty(errors, 'noteText')}
        fieldType="textarea"
      />
    </>
  );
};

NoteForm.propTypes = {
  namespace: PropTypes.object,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default NoteForm;
