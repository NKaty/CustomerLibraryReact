import DependentEntityList from '../common/DependentEntityList';
import addressService from '../../services/address.service';

const AddressList = () => {
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

  const getListProps = () => {
    return {
      name: 'address',
      service: addressService,
      listTitle: 'Addresses',
      idName: 'addressId',
      columns: columns,
    };
  };

  return <DependentEntityList entityProps={getListProps()} />;
};

export default AddressList;
