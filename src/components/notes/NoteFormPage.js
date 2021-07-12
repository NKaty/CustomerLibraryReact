import { Component } from 'react';
import { Formik, Form } from 'formik';
import NoteForm from './NoteForm';
import withAlert from '../hoc/withAlert';
import Alert from '../common/Alert';
import ButtonLink from '../common/ButtonLink';
import ButtonSpinner from '../common/ButtonSpinner';
import noteValidationSchema from '../../validationSchemas/note.validationSchema';
import noteService from '../../services/note.service';

class NoteFormPage extends Component {
  state = {
    note: {
      noteText: '',
      customerId: this.getIdParam('customerId'),
      noteId: 0,
    },
    isLoading: true,
    isLoaded: false,
    isCreateMode: true,
  };

  componentDidMount() {
    if (this.state.note.customerId === 0) {
      return this.props.showAlert('Customer is not found.', 'error');
    }

    const noteId = this.getIdParam('noteId');
    if (noteId !== 0) {
      this.getData(noteId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isLoading && !prevState.isLoaded) {
      this.props.closeAlert();

      if (this.state.note.customerId === 0) {
        return this.props.showAlert('Customer is not found.', 'error');
      }

      const noteId = this.getIdParam('noteId');
      if (noteId !== 0) {
        this.getData(noteId);
      }
    }
  }

  getData(id) {
    noteService.getById(id).then(data => {
      if (data.error) {
        this.setState({ isLoading: false, isLoaded: true });
        this.props.showAlert(data.errorTitle, 'error');
      } else {
        this.setState({
          note: data,
          isLoading: false,
          isLoaded: true,
          isCreateMode: false,
        });
      }
    });
  }

  getIdParam(idName) {
    const id = parseInt(this.props.match.params[idName], 10);
    return isNaN(id) ? 0 : id;
  }

  onSubmit = (fields, { setStatus, setSubmitting, setFieldError }) => {
    setStatus();
    if (this.state.isCreateMode) {
      this.createNote(fields, setSubmitting, setFieldError);
    } else {
      this.updateNote(fields, setSubmitting, setFieldError);
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

  createNote(fields, setSubmitting, setFieldError) {
    noteService.create(fields).then(data => {
      if (data.error) {
        setSubmitting(false);
        this.showError(data, setFieldError);
      } else {
        this.props.history.goBack();
      }
    });
  }

  updateNote(fields, setSubmitting, setFieldError) {
    noteService.update(this.state.note.noteId, fields).then(data => {
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
        <h2 className="text-primary text-center my-5">Note Form</h2>
        <div className="d-flex justify-content-center">
          <Formik
            initialValues={this.state.note}
            validationSchema={noteValidationSchema}
            onSubmit={this.onSubmit}
            enableReinitialize
          >
            {({ errors, touched, isSubmitting, handleReset }) => {
              return (
                <Form className="flex-fill form">
                  <NoteForm errors={errors} touched={touched} />
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

export default withAlert(NoteFormPage);
