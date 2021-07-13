import NoteForm from './NoteForm';
import noteValidationSchema from '../../validationSchemas/note.validationSchema';
import noteService from '../../services/note.service';
import DependentEntityCreateEditForm from '../common/DependentEntityCreateEditForm';
import noteInitialState from '../../initialStates/note.initialState';

const NoteFormPage = () => {
  const getFormProps = () => {
    return {
      service: noteService,
      validationSchema: noteValidationSchema,
      initialState: noteInitialState,
      formTitle: 'Note Form',
      idName: 'noteId',
      form: props => <NoteForm {...props} />,
    };
  };

  return <DependentEntityCreateEditForm entityProps={getFormProps()} />;
};

export default NoteFormPage;
