import { Component } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import PropTypes from 'prop-types';
import NoteForm from '../notes/NoteForm';
import withAlert from '../hoc/withAlert';
import withCreateEditForm from '../hoc/withCreateEditForm';
import Alert from '../common/Alert';
import CustomerForm from './CustomerForm';
import CreateEditSubmitButtonGroup from '../common/CreateEditSubmitButtonGroup';
import AddressForm from '../addresses/AddressForm';
import customerService from '../../services/customer.service';
import customerValidationSchema from '../../validationSchemas/customer.validationSchema';
import noteInitialState from '../../initialStates/note.initialState';
import customerInitialState from '../../initialStates/customer.initialState';
import addressInitialState from '../../initialStates/address.initialState';

class CustomerFormPage extends Component {
  state = {
    customer: customerInitialState,
    notesStartLength: 1,
    addressesStartLength: 1,
    isLoading: true,
    isLoaded: false,
  };

  componentDidMount() {
    this.initializeForm();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isLoading && !prevState.isLoaded) {
      this.props.closeAlert();
      this.initializeForm();
    }
  }

  initializeForm() {
    const customerId = this.getCustomerId();
    if (customerId !== 0) {
      this.getData(customerId);
    } else {
      if (!this.state.customer.notes.length) {
        this.setState(prevState => ({
          customer: {
            ...prevState.customer,
            notes: [
              {
                ...noteInitialState,
                customerId: prevState.customer.customerId,
              },
            ],
          },
        }));
      }

      if (!this.state.customer.addresses.length) {
        this.setState(prevState => ({
          customer: {
            ...prevState.customer,
            addresses: [
              {
                ...addressInitialState,
                customerId: prevState.customer.customerId,
              },
            ],
          },
        }));
      }
    }
  }

  getData(id) {
    customerService.getById(id).then(data => {
      if (data.error) {
        this.setState({ isLoading: false, isLoaded: true });
        this.props.showAlert(data.errorTitle, 'error');
      } else {
        this.setState({
          customer: data,
          notesStartLength: data.notes.length,
          addressesStartLength: data.addresses.length,
          isLoading: false,
          isLoaded: true,
        });
      }
    });
  }

  getCustomerId() {
    const id = parseInt(this.props.match.params.customerId, 10);
    return isNaN(id) ? 0 : id;
  }

  renderSubForm(
    subForm,
    startLength,
    entities,
    formTitle,
    subTitle,
    propertyName,
    entityName,
    initialState,
    errors,
    touched
  ) {
    const { customer } = this.state;

    return (
      <div className="mt-4">
        <h4 className="text-primary">{formTitle}</h4>
        <div className="ms-4">
          <FieldArray
            name={propertyName}
            render={arrayHelpers => {
              const onClickAddEntity = event => {
                event.preventDefault();
                arrayHelpers.push({
                  ...initialState,
                  customerId: customer.customerId,
                });
              };

              const onClickRemoveEntity = event => {
                event.preventDefault();
                if (entities.length > startLength) {
                  arrayHelpers.pop();
                } else {
                  this.props.showAlert(
                    `Cannot remove the last ${entityName}.`,
                    'error'
                  );
                }
              };

              return (
                <>
                  {entities.map((note, index) => (
                    <div key={index}>
                      {subTitle && <h5>{subTitle}</h5>}
                      {subForm({
                        namespace: { property: propertyName, index },
                        errors,
                        touched,
                      })}
                    </div>
                  ))}
                  <div className="text-end">
                    <button
                      className="btn btn-secondary me-2"
                      onClick={onClickAddEntity}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-secondary"
                      disabled={entities.length <= startLength}
                      onClick={onClickRemoveEntity}
                    >
                      -
                    </button>
                  </div>
                </>
              );
            }}
          />
        </div>
      </div>
    );
  }

  render() {
    const { message, status, closeAlert, onSubmit, onClickCancelButton } =
      this.props;
    const { customer, addressesStartLength, notesStartLength } = this.state;

    return (
      <>
        {message && (
          <Alert
            message={message}
            status={status}
            onClickCloseButton={closeAlert}
          />
        )}
        <h2 className="text-primary text-center my-5">Customer Form</h2>
        <div className="d-flex justify-content-center">
          <Formik
            initialValues={customer}
            validationSchema={customerValidationSchema}
            onSubmit={onSubmit(customer.customerId, customerService)}
            enableReinitialize
          >
            {({ errors, touched, isSubmitting, handleReset, values }) => {
              return (
                <Form className="flex-fill form">
                  <CustomerForm errors={errors} touched={touched} />
                  {this.renderSubForm(
                    props => (
                      <AddressForm {...props} />
                    ),
                    addressesStartLength,
                    values.addresses,
                    'Addresses',
                    'Address',
                    'addresses',
                    'address',
                    addressInitialState,
                    errors,
                    touched
                  )}
                  {this.renderSubForm(
                    props => (
                      <NoteForm {...props} />
                    ),
                    notesStartLength,
                    values.notes,
                    'Notes',
                    null,
                    'notes',
                    'note',
                    noteInitialState,
                    errors,
                    touched
                  )}
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

CustomerFormPage.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
  showAlert: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
  onClickCancelButton: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default withAlert(withCreateEditForm(CustomerFormPage));
