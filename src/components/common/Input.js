import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';

const Input = ({ displayName, fieldName, fieldType, isError, isTouched }) => {
  return (
    <div className="mb-3">
      <label htmlFor={fieldName} className="form-label">
        {displayName}
      </label>
      <Field
        as={fieldType}
        name={fieldName}
        id={fieldName}
        className={'form-control' + (isError && isTouched ? ' is-invalid' : '')}
      />
      <ErrorMessage
        name={fieldName}
        component="div"
        className="invalid-feedback d-block"
      />
    </div>
  );
};

Input.propTypes = {
  displayName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldType: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isTouched: PropTypes.bool.isRequired,
};

Input.defaultProps = {
  fieldType: 'input',
};

export default Input;
