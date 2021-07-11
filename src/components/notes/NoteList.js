import { Component } from 'react';
import DependentEntityList from '../common/DependentEntityList';
import noteService from '../../services/note.service';

class NoteList extends Component {
  columns = [
    { name: 'noteText', displayName: 'Note', className: 'col-10' },
    { name: 'actions', displayName: 'Actions' },
  ];

  getListProps() {
    return {
      name: 'notes',
      service: noteService,
      listTitle: 'Notes',
      id: 'noteId',
      columns: this.columns,
    };
  }

  render() {
    return <DependentEntityList entity={this.getListProps()} {...this.props} />;
  }
}

export default NoteList;
