import { Component } from 'react';
import { Formik, Form } from 'formik';
import NoteForm from './NoteForm';
import withAlert from '../hoc/withAlert';
import withCreateEditForm from '../hoc/withCreateEditForm';
import Alert from '../common/Alert';
import ButtonLink from '../common/ButtonLink';
import ButtonSpinner from '../common/ButtonSpinner';
import noteValidationSchema from '../../validationSchemas/note.validationSchema';
import noteService from '../../services/note.service';

class NoteFormPage extends Component {
  idName = 'noteId';

  state = {
    entity: {
      noteText: '',
      customerId: this.getIdParam('customerId'),
      noteId: 0,
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
      this.initializeForm();
    }
  }

  initializeForm() {
    if (this.state.entity.customerId === 0) {
      return this.props.showAlert('Customer is not found.', 'error');
    }

    const noteId = this.getIdParam('noteId');
    if (noteId !== 0) {
      this.getData(noteId);
    }
  }

  getData(id) {
    noteService.getById(id).then(data => {
      if (data.error) {
        this.setState({ isLoading: false, isLoaded: true });
        this.props.showAlert(data.errorTitle, 'error');
      } else {
        this.setState({
          entity: data,
          isLoading: false,
          isLoaded: true,
        });
      }
    });
  }

  getIdParam(idName) {
    const id = parseInt(this.props.match.params[idName], 10);
    return isNaN(id) ? 0 : id;
  }

  render() {
    const { message, status, closeAlert, onSubmit, onClickCancelButton } =
      this.props;
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
            initialValues={this.state.entity}
            validationSchema={noteValidationSchema}
            onSubmit={onSubmit(this.state.entity.noteId)}
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
                      onClickButton={onClickCancelButton}
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

export default withAlert(withCreateEditForm(NoteFormPage, noteService));
