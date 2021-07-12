import { Field, ErrorMessage } from 'formik';

const NoteForm = ({ errors, touched }) => {
  return (
    <>
      <Field name="customerId" type="text" hidden />
      <Field name="noteId" type="text" hidden />
      <div className="row mb-3">
        <label htmlFor="noteText" className="col-sm-2 col-form-label">
          Note
        </label>
        <div className="col-sm-10">
          <Field
            as="textarea"
            name="noteText"
            id="noteText"
            className={
              'form-control' +
              (errors.noteText && touched.noteText ? ' is-invalid' : '')
            }
          />
        </div>
        <ErrorMessage
          name="noteText"
          component="div"
          className="invalid-feedback d-block offset-sm-2"
        />
      </div>
    </>
  );
};

export default NoteForm;
