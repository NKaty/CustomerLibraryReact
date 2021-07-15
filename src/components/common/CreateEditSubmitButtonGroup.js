import PropTypes from 'prop-types';
import ButtonSpinner from './ButtonSpinner';
import ButtonLink from './ButtonLink';

const CreateEditSubmitButtonGroup = ({
  isSubmitting,
  handleReset,
  onClickCancelButton,
}) => {
  return (
    <div className="form-group my-5">
      <button
        type="submit"
        className="btn btn-primary me-3"
        disabled={isSubmitting}
      >
        {isSubmitting && <ButtonSpinner />}
        Save
      </button>
      <button onClick={handleReset} className="btn btn-secondary me-3">
        Reset
      </button>
      <ButtonLink onClickButton={onClickCancelButton} label="Cancel" />
    </div>
  );
};

CreateEditSubmitButtonGroup.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  handleReset: PropTypes.func.isRequired,
  onClickCancelButton: PropTypes.func.isRequired,
};

export default CreateEditSubmitButtonGroup;
