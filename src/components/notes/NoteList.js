import DependentEntityList from '../common/DependentEntityList';
import noteService from '../../services/note.service';

const NoteList = () => {
  const columns = [
    { name: 'noteText', displayName: 'Note', className: 'col-10' },
    { name: 'actions', displayName: 'Actions' },
  ];

  const getListProps = () => {
    return {
      name: 'notes',
      service: noteService,
      listTitle: 'Notes',
      idName: 'noteId',
      columns: columns,
    };
  };

  return <DependentEntityList entityProps={getListProps()} />;
};

export default NoteList;
