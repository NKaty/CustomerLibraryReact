import { Field, ErrorMessage } from 'formik';

const Select = ({ displayName, fieldName, isError, isTouched, options }) => {
  return (
    <div className="mb-3">
      <label htmlFor={fieldName} className="form-label">
        {displayName}
      </label>
      <Field
        as="select"
        name={fieldName}
        id={fieldName}
        className={'form-control' + (isError && isTouched ? ' is-invalid' : '')}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={fieldName}
        component="div"
        className="invalid-feedback"
      />
    </div>
  );
};

export default Select;
