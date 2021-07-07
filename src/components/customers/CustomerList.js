import PrimaryLink from '../common/PrimaryLink';
import Table from '../common/Table';
import customers from '../../customers.json';

const CustomerList = () => {
  const columns = [
    { name: 'firstName', displayName: 'First Name' },
    { name: 'lastName', displayName: 'Last Name' },
    { name: 'phone', displayName: 'Phone' },
    { name: 'email', displayName: 'Email' },
    { name: 'totalPurchasesAmount', displayName: 'Total Amount' },
    { name: 'addresses', displayName: 'Addresses' },
    { name: 'notes', displayName: 'Notes' },
    { name: 'actions', displayName: 'Actions' },
  ];

  const prepareData = data =>
    data.map(item => {
      item.addresses = (
        <PrimaryLink to={`/customers/${item.customerId}/addresses/`}>
          Addresses
        </PrimaryLink>
      );
      item.notes = (
        <PrimaryLink to={`/customers/${item.customerId}/notes/`}>
          Notes
        </PrimaryLink>
      );
      item.actions = (
        <>
          <PrimaryLink to={`/customers/edit/${item.customerId}/`}>
            Edit
          </PrimaryLink>
          &nbsp;|&nbsp;
          <PrimaryLink to={`/customers/delete/${item.customerId}/`}>
            Delete
          </PrimaryLink>
        </>
      );
      return item;
    });

  return (
    <>
      <h2 className="text-primary my-4">Customers</h2>
      <p>
        <PrimaryLink to={`/customers/create/`}>Create New</PrimaryLink>
      </p>
      <Table columns={columns} data={prepareData(customers)} />
    </>
  );
};

export default CustomerList;
