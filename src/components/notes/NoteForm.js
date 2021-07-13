import { Field, ErrorMessage } from 'formik';
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
      <Field name={getName('nodeId')} type="text" hidden />
      <div className="mb-3">
        <label htmlFor="noteText" className="form-label">
          Note
        </label>
        <Field
          as="textarea"
          name={getName('noteText')}
          id="noteText"
          className={
            'form-control' +
            (getProperty(errors, 'noteText') && getProperty(touched, 'noteText')
              ? ' is-invalid'
              : '')
          }
        />
        <ErrorMessage
          name={getName('noteText')}
          component="div"
          className="invalid-feedback d-block"
        />
      </div>
    </>
  );
};

export default NoteForm;
