import { Component } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import NoteForm from '../notes/NoteForm';
import withAlert from '../hoc/withAlert';
import Alert from '../common/Alert';
import ButtonLink from '../common/ButtonLink';
import ButtonSpinner from '../common/ButtonSpinner';
import CustomerForm from './CustomerForm';
import customerService from '../../services/customer.service';
import customerValidationSchema from '../../validationSchemas/customer.validationSchema';
import noteInitialState from '../../initialStates/note.initialState';
import customerInitialState from '../../initialStates/customer.initialState';

class CustomerFormPage extends Component {
  state = {
    customer: customerInitialState,
    notesStartLength: 1,
    addressesStartLength: 1,
    isLoading: true,
    isLoaded: false,
    isCreateMode: true,
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
          isLoading: false,
          isLoaded: true,
          isCreateMode: false,
        });
      }
    });
  }

  getCustomerId() {
    const id = parseInt(this.props.match.params.customerId, 10);
    return isNaN(id) ? 0 : id;
  }

  onSubmit = (fields, { setStatus, setSubmitting, setFieldError }) => {
    setStatus();
    if (this.state.isCreateMode) {
      this.createCustomer(fields, setSubmitting, setFieldError);
    } else {
      this.updateCustomer(fields, setSubmitting, setFieldError);
    }
  };

  showError(error, setFieldError) {
    if (error.validationErrors) {
      if (error.validationErrors['']) {
        this.props.showAlert(error.validationErrors[''][0], 'error');
      } else {
        Object.keys(error.validationErrors).forEach(field =>
          setFieldError(
            `${field[0].toLowerCase()}${field.slice(1)}`,
            error.validationErrors[field].join(' ')
          )
        );
      }
    } else {
      this.props.showAlert(error.errorTitle, 'error');
    }
  }

  createCustomer(fields, setSubmitting, setFieldError) {
    customerService.create(fields).then(data => {
      if (data.error) {
        setSubmitting(false);
        this.showError(data, setFieldError);
      } else {
        this.props.history.goBack();
      }
    });
  }

  updateCustomer(fields, setSubmitting, setFieldError) {
    customerService.update(this.state.note.noteId, fields).then(data => {
      if (data.error) {
        setSubmitting(false);
        this.showError(data, setFieldError);
      } else {
        this.props.history.goBack();
      }
    });
  }

  onClickCancelButton = event => {
    event.preventDefault();
    this.props.history.goBack();
  };

  renderNoteForm(values, errors, touched) {
    const { customer, notesStartLength } = this.state;

    return (
      <>
        <h4 className="text-primary">Notes</h4>
        <div className="ms-4">
          <FieldArray
            name="notes"
            render={arrayHelpers => {
              const onClickAddNote = event => {
                event.preventDefault();
                arrayHelpers.push({
                  ...noteInitialState,
                  customerId: customer.customerId,
                });
              };

              const onClickRemoveNote = event => {
                event.preventDefault();
                if (values.notes.length > notesStartLength) {
                  arrayHelpers.pop();
                } else {
                  this.props.showAlert('Cannot remove the last note.', 'error');
                }
              };

              return (
                <>
                  {values.notes.map((note, index) => (
                    <div key={index}>
                      <NoteForm
                        namespace={{ property: 'notes', index }}
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                  ))}
                  <div className="text-end">
                    <button
                      className="btn btn-secondary me-2"
                      onClick={onClickAddNote}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-secondary"
                      disabled={values.notes.length <= notesStartLength}
                      onClick={onClickRemoveNote}
                    >
                      -
                    </button>
                  </div>
                </>
              );
            }}
          />
        </div>
      </>
    );
  }

  render() {
    const { message, status, closeAlert } = this.props;

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
            initialValues={this.state.customer}
            validationSchema={customerValidationSchema}
            onSubmit={this.onSubmit}
            enableReinitialize
          >
            {({ errors, touched, isSubmitting, handleReset, values }) => {
              return (
                <Form className="flex-fill form">
                  <CustomerForm errors={errors} touched={touched} />
                  {this.renderNoteForm(values, errors, touched)}
                  <div className="form-group my-5">
                    <button type="submit" className="btn btn-primary me-3">
                      {isSubmitting && <ButtonSpinner />}
                      Save
                    </button>
                    <button
                      onClick={handleReset}
                      disabled={isSubmitting}
                      className="btn btn-secondary me-3"
                    >
                      Reset
                    </button>
                    <ButtonLink
                      onClickButton={this.onClickCancelButton}
                      label="Cancel"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </>
    );
  }
}

export default withAlert(CustomerFormPage);