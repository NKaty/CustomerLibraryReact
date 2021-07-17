import { Component } from 'react';
import { Formik, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import withAlert from '../hoc/withAlert';
import withCreateEditForm from '../hoc/withCreateEditForm';
import Alert from '../common/Alert';
import CreateEditSubmitButtonGroup from '../common/CreateEditSubmitButtonGroup';
import { convertNullToEmptyString } from '../../utils/convertNullableFields';

export class DependentEntityCreateEditForm extends Component {
  state = {
    entity: {
      ...this.props.entityProps.initialState,
      customerId: this.getIdParam('customerId'),
    },
    isLoading: true,
    isLoaded: false,
  };

  componentDidMount() {
    this.initializeForm();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isLoading && !prevState.isLoaded) {
      this.props.closeAlert();
      return this.initializeForm();
    }
  }

  initializeForm() {
    const { entityProps, showAlert } = this.props;

    if (this.state.entity.customerId === 0) {
      this.setState({ isLoading: false, isLoaded: true });
      return showAlert('Customer is not found.', 'error');
    }

    const entityId = this.getIdParam(entityProps.idName);
    if (entityId !== 0) {
      return this.getData(entityId);
    } else {
      this.setState({ isLoading: false, isLoaded: true });
    }
  }

  getData(id) {
    const { entityProps, showAlert } = this.props;

    return entityProps.service.getById(id).then(data => {
      if (data && data.error) {
        this.setState({ isLoading: false, isLoaded: true });
        showAlert(data.errorTitle, 'error');
      } else if (data) {
        this.setState({
          entity: convertNullToEmptyString(data),
          isLoading: false,
          isLoaded: true,
        });
      } else {
        this.setState({ isLoading: false, isLoaded: true });
      }
    });
  }

  getIdParam(idName) {
    const id = parseInt(this.props.match.params[idName], 10);
    return isNaN(id) ? 0 : id;
  }

  render() {
    const { entity } = this.state;
    const {
      message,
      status,
      closeAlert,
      onSubmit,
      onClickCancelButton,
      entityProps,
    } = this.props;

    const { formTitle, validationSchema, idName, form, service } = entityProps;

    return (
      <>
        {message && (
          <Alert
            message={message}
            status={status}
            onClickCloseButton={closeAlert}
          />
        )}
        <h2 className="text-primary text-center my-5">{formTitle}</h2>
        <div className="d-flex justify-content-center">
          <Formik
            initialValues={entity}
            validationSchema={validationSchema}
            onSubmit={onSubmit(entity[idName], service)}
            enableReinitialize
          >
            {({ errors, touched, isSubmitting, handleReset }) => {
              return (
                <Form className="flex-fill form">
                  {form({ errors, touched })}
                  <CreateEditSubmitButtonGroup
                    isSubmitting={isSubmitting}
                    onClickCancelButton={onClickCancelButton}
                    handleReset={handleReset}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </>
    );
  }
}

DependentEntityCreateEditForm.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
  showAlert: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
  onClickCancelButton: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  entityProps: PropTypes.object.isRequired,
};

export default withRouter(
  withAlert(withCreateEditForm(DependentEntityCreateEditForm))
);
