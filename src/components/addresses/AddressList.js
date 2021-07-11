import { Component } from 'react';
import PropTypes from 'prop-types';
import PrimaryLink from '../common/PrimaryLink';
import Table from '../common/Table';
import ButtonLink from '../common/ButtonLink';
import Modal from '../common/Modal';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';
import withDeleteModal from '../hoc/withDeleteModal';
import withAlert from '../hoc/withAlert';
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
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isLoading && !prevState.isLoaded) {
      this.props.closeAlert();
      this.getData();
    }
  }

  getCustomerId() {
    return parseInt(this.props.match.params.customerId, 10);
  }

  getData = () => {
    const customerId = this.getCustomerId();
    if (isNaN(customerId) || customerId === 0) {
      this.props.showAlert('Customer is not found.', 'error');
    }

    addressService.getByCustomerId(customerId).then(data => {
      if (data.error) {
        this.setState({ isLoading: false, isLoaded: true });
        this.props.showAlert(data.error, 'error');
      } else {
        this.setState({
          addresses: data,
          isLoading: false,
          isLoaded: true,
        });
      }
    });
  };

  deleteModal = {
    title: 'Delete address',
    body: 'Are you sure you want to delete this address?',
    cancelButtonLabel: 'Cancel',
    actionButtonLabel: 'Delete',
    onCancel: this.props.onClickModalCancelButton,
    onAction: this.props.onClickModalDeleteButton(
      addressService,
      error => this.props.showAlert(error, 'error'),
      this.getData
    ),
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
            onClickButton={this.props.openModal(item.addressId)}
            label="Delete"
            disabled={data.length < 2}
          />
        </>
      );
      return item;
    });
  };

  render() {
    const { isLoading, addresses } = this.state;
    const { isModalOpen, message, status, closeAlert, location } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <>
        {isModalOpen && <Modal {...this.deleteModal} />}
        {message && (
          <Alert
            message={message}
            status={status}
            onClickCloseButton={closeAlert}
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
            <PrimaryLink to={`${location.pathname}create/`}>
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
  isModalOpen: PropTypes.bool.isRequired,
  message: PropTypes.string,
  status: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  onClickModalCancelButton: PropTypes.func.isRequired,
  onClickModalDeleteButton: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
};

export default withAlert(withDeleteModal(AddressList));
