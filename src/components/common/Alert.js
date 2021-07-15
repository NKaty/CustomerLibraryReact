import PropTypes from 'prop-types';

const Alert = ({ message, status, onClickCloseButton }) => {
  const alertClassMap = {
    error: 'alert-danger',
    success: 'alert-success',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  const getAlertClass = status => {
    return alertClassMap[status] ?? alertClassMap['info'];
  };

  return (
    <div
      className={`alert alert-dismissible ${getAlertClass(status)} my-5`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClickCloseButton}
      />
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string,
  onClickCloseButton: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  status: 'alert-info',
};

export default Alert;
