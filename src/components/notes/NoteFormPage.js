import PropTypes from 'prop-types';
import NoteForm from './NoteForm';
import withAlert from '../hoc/withAlert';
import withCreateEditForm from '../hoc/withCreateEditForm';
import noteValidationSchema from '../../validationSchemas/note.validationSchema';
import noteService from '../../services/note.service';
import DependentEntityCreateEditForm from '../common/DependentEntityCreateEditForm';
import noteInitialState from '../../initialStates/note.initialState';

const NoteFormPage = props => {
  const getFormProps = () => {
    return {
      name: 'notes',
      service: noteService,
      validationSchema: noteValidationSchema,
      initialState: noteInitialState,
      formTitle: 'Note Form',
      idName: 'noteId',
      form: props => <NoteForm {...props} />,
    };
  };

  return (
    <DependentEntityCreateEditForm entityProps={getFormProps()} {...props} />
  );
};

NoteFormPage.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
  showAlert: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
  onClickCancelButton: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default withAlert(withCreateEditForm(NoteFormPage, noteService));
