import PropTypes from 'prop-types';

const Modal = ({
  title,
  body,
  cancelButtonLabel,
  actionButtonLabel,
  onCancel,
  onAction,
}) => {
  return (
    <>
      <div className="modal-backdrop opacity-50" />
      <div
        className="modal fade show d-block"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-modal="true"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {title}
              </h5>
              <button
                type="button"
                onClick={onCancel}
                className="btn-close"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-secondary"
              >
                {cancelButtonLabel}
              </button>
              <button
                type="button"
                onClick={onAction}
                className="btn btn-primary"
              >
                {actionButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  cancelButtonLabel: PropTypes.string.isRequired,
  actionButtonLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Modal;
