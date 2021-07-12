import PropTypes from 'prop-types';

const ButtonLink = ({ label, onClickButton, disabled }) => {
  return (
    <button
      onClick={onClickButton}
      className="btn btn-link text-decoration-none text-primary d-inline m-0 p-0 align-baseline"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

ButtonLink.propTypes = {
  label: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ButtonLink.defaultProps = {
  disabled: false,
};

export default ButtonLink;
