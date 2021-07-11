import { Component } from 'react';
import DependentEntityList from '../common/DependentEntityList';
import addressService from '../../services/address.service';

class AddressList extends Component {
  columns = [
    { name: 'addressLine', displayName: 'Address Line' },
    { name: 'addressLine2', displayName: 'Address Line2' },
    { name: 'addressType', displayName: 'Address Type' },
    { name: 'city', displayName: 'City' },
    { name: 'postalCode', displayName: 'Postal code' },
    { name: 'state', displayName: 'State' },
    { name: 'country', displayName: 'Country' },
    { name: 'actions', displayName: 'Actions' },
  ];

  getListProps() {
    return {
      name: 'address',
      service: addressService,
      listTitle: 'Addresses',
      id: 'addressId',
      columns: this.columns,
    };
  }

  render() {
    return <DependentEntityList entity={this.getListProps()} {...this.props} />;
  }
}

export default AddressList;
