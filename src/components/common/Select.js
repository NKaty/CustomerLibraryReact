import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

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

Select.propTypes = {
  displayName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  isError: PropTypes.bool.isRequired,
  isTouched: PropTypes.bool.isRequired,
};

export default Select;
