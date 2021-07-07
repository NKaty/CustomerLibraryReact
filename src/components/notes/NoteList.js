import PrimaryLink from '../common/PrimaryLink';
import Table from '../common/Table';
import notes from '../../notes.json';

const NoteList = ({ match }) => {
  const columns = [
    { name: 'noteText', displayName: 'Note', className: 'col-10' },
    { name: 'actions', displayName: 'Actions' },
  ];

  const { url, params } = match;

  const getCustomerNotes = data =>
    data.filter(item => item.customerId === +params.customerId);

  const prepareData = data =>
    data.map(item => {
      item.actions = (
        <>
          <PrimaryLink to={`/${url}/edit/${item.noteId}/`}>Edit</PrimaryLink>
          &nbsp;|&nbsp;
          <PrimaryLink to={`/${url}/delete/${item.noteId}/`}>
            Delete
          </PrimaryLink>
        </>
      );
      return item;
    });

  return (
    <>
      <h2 className="text-primary my-4">Notes</h2>
      <div className="d-flex justify-content-between">
        <p>
          <PrimaryLink to="/customers/">Return to Customers</PrimaryLink>
        </p>
        <p>
          <PrimaryLink to={`/${url}/create/`}>Create New</PrimaryLink>
        </p>
      </div>
      <Table columns={columns} data={prepareData(getCustomerNotes(notes))} />
    </>
  );
};

export default NoteList;
