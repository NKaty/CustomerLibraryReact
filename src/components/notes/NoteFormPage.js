import NoteForm from './NoteForm';

const NoteFormPage = ({ match }) => {
  const { noteId } = match.params;
  const isCreateMode = !noteId;

  return <NoteForm isCreateMode={isCreateMode} />;
};

export default NoteFormPage;
