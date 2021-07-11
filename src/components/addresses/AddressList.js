import { Component } from 'react';
import PropTypes from 'prop-types';
import PrimaryLink from '../common/PrimaryLink';
import Table from '../common/Table';
import ButtonLink from '../common/ButtonLink';
import Modal from '../common/Modal';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';
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

  state = {
    addresses: [],
    isLoading: true,
    isLoaded: false,
    isModalOpen: false,
    idToDelete: null,
    error: null,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isLoading && !prevState.isLoaded) {
      this.getData();
    }
  }

  getCustomerId() {
    return parseInt(this.props.match.params.customerId, 10);
  }

  getData() {
    const customerId = this.getCustomerId();
    if (isNaN(customerId) || customerId === 0) {
      return this.setState({ error: 'Customer is not found.' });
    }

    addressService.getByCustomerId(customerId).then(data => {
      if (data.error) {
        this.setState({
          error: data.error,
          isLoading: false,
          isLoaded: true,
        });
      } else {
        this.setState({
          addresses: data,
          isLoading: false,
          isLoaded: true,
        });
      }
    });
  }

  onClickDeleteButton = addressId => event => {
    event.preventDefault();
    this.setState({ isModalOpen: true, idToDelete: addressId });
  };

  onClickModalDeleteButton = event => {
    event.preventDefault();
    this.setState({ isModalOpen: false });
    if (this.state.idToDelete) {
      addressService.delete(this.state.idToDelete).then(data => {
        this.setState({ idToDelete: null });
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.getData();
        }
      });
    }
  };

  onClickModalCancelButton = event => {
    event.preventDefault();
    this.setState({ isModalOpen: false });
  };

  onClickAlertCloseButton = event => {
    event.preventDefault();
    this.setState({ error: null });
  };

  deleteModal = {
    title: 'Delete address',
    body: 'Are you sure you want to delete this address?',
    cancelButtonLabel: 'Cancel',
    actionButtonLabel: 'Delete',
    onCancel: this.onClickModalCancelButton,
    onAction: this.onClickModalDeleteButton,
  };

  onClickReturnButton = event => {
    event.preventDefault();
    this.props.history.goBack();
  };

  prepareData = data => {
    return data.map(item => {
      item.actions = (
        <>
          <PrimaryLink
            to={`${this.props.location.pathname}edit/${item.addressId}/`}
          >
            Edit
          </PrimaryLink>
          &nbsp;|&nbsp;
          <ButtonLink
            onClickButton={this.onClickDeleteButton(item.addressId)}
            label="Delete"
            disabled={data.length < 2}
          />
        </>
      );
      return item;
    });
  };

  render() {
    const { isLoading, isModalOpen, addresses, error } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <>
        {isModalOpen && <Modal {...this.deleteModal} />}
        {error && (
          <Alert
            message={error}
            status="error"
            onClickCloseButton={this.onClickAlertCloseButton}
          />
        )}
        <h2 className="text-primary my-4">Addresses</h2>
        <div className="d-flex justify-content-between">
          <p>
            <ButtonLink
              onClickButton={this.onClickReturnButton}
              label="Return to Customers"
            />
          </p>
          <p>
            <PrimaryLink to={`${this.props.location.pathname}create/`}>
              Create New
            </PrimaryLink>
          </p>
        </div>
        <Table columns={this.columns} data={this.prepareData(addresses)} />
      </>
    );
  }
}

AddressList.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default AddressList;
