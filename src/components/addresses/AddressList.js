import PrimaryLink from '../common/PrimaryLink';
import Table from '../common/Table';
import addresses from '../../addresses.json';

const AddressList = ({ match }) => {
  const columns = [
    { name: 'addressLine', displayName: 'Address Line' },
    { name: 'addressLine2', displayName: 'Address Line2' },
    { name: 'addressType', displayName: 'Address Type' },
    { name: 'city', displayName: 'City' },
    { name: 'postalCode', displayName: 'Postal code' },
    { name: 'state', displayName: 'State' },
    { name: 'country', displayName: 'Country' },
    { name: 'actions', displayName: 'Actions' },
  ];

  const { url, params } = match;

  const getCustomerAddresses = data =>
    data.filter(item => item.customerId === +params.customerId);

  const prepareData = data =>
    data.map(item => {
      item.actions = (
        <>
          <PrimaryLink to={`/${url}/edit/${item.addressId}/`}>Edit</PrimaryLink>
          &nbsp;|&nbsp;
          <PrimaryLink to={`/${url}/delete/${item.addressId}/`}>
            Delete
          </PrimaryLink>
        </>
      );
      return item;
    });

  return (
    <>
      <h2 className="text-primary my-4">Addresses</h2>
      <div className="d-flex justify-content-between">
        <p>
          <PrimaryLink to="/customers/">Return to Customers</PrimaryLink>
        </p>
        <p>
          <PrimaryLink to={`/${url}/create/`}>Create New</PrimaryLink>
        </p>
      </div>
      <Table
        columns={columns}
        data={prepareData(getCustomerAddresses(addresses))}
      />
    </>
  );
};

export default AddressList;
