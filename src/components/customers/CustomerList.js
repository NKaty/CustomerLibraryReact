import { Component } from 'react';
import PropTypes from 'prop-types';
import PrimaryLink from '../common/PrimaryLink';
import ButtonLink from '../common/ButtonLink';
import Table from '../common/Table';
import Spinner from '../common/Spinner';
import Pagination from '../common/Pagination';
import Modal from '../common/Modal';
import Alert from '../common/Alert';
import withDeleteModal from '../hoc/withDeleteModal';
import withAlert from '../hoc/withAlert';
import customerService from '../../services/customer.service';

class CustomerList extends Component {
  columns = [
    { name: 'firstName', displayName: 'First Name' },
    { name: 'lastName', displayName: 'Last Name' },
    { name: 'phone', displayName: 'Phone' },
    { name: 'email', displayName: 'Email' },
    { name: 'totalPurchasesAmount', displayName: 'Total Amount' },
    { name: 'addresses', displayName: 'Addresses' },
    { name: 'notes', displayName: 'Notes' },
    { name: 'actions', displayName: 'Actions' },
  ];

  pagination = {
    perPage: 10,
    pageNeighbours: 3,
  };

  state = {
    customers: [],
    totalCount: null,
    isLoading: true,
    isLoaded: false,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.getCurrentPage(prevProps.location) !==
        this.getCurrentPage(this.props.location) ||
      (!prevState.isLoading && !prevState.isLoaded)
    ) {
      this.props.closeAlert();
      this.getData();
    }
  }

  getCurrentPage(location) {
    const searchParams = new URLSearchParams(location.search);
    let page = parseInt(searchParams.get('page'), 10);
    if (isNaN(page) || page === 0) page = 1;
    return page;
  }

  getPageParams() {
    const currentPage = this.getCurrentPage(this.props.location);
    const offset = (currentPage - 1) * this.pagination.perPage;
    return [offset, this.pagination.perPage];
  }

  getData = () => {
    customerService.getPage(...this.getPageParams()).then(data => {
      if (data.error) {
        this.setState({ isLoading: false, isLoaded: true });
        this.props.showAlert(data.error, 'error');
      } else {
        this.setState({
          customers: data.customers,
          totalCount: data.totalCount,
          isLoading: false,
          isLoaded: true,
        });
      }
    });
  };

  prepareData(customers) {
    return customers.map(item => {
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
          <ButtonLink
            onClickButton={this.props.openModal(item.customerId)}
            label="Delete"
          />
        </>
      );
      return item;
    });
  }

  deleteModal = {
    title: 'Delete customer',
    body: 'Are you sure you want to delete this customer?',
    cancelButtonLabel: 'Cancel',
    actionButtonLabel: 'Delete',
    onCancel: this.props.onClickModalCancelButton,
    onAction: this.props.onClickModalDeleteButton(
      customerService,
      error => this.props.showAlert(error, 'error'),
      this.getData
    ),
  };

  render() {
    const { isLoading, customers, totalCount } = this.state;
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
        <h2 className="text-primary my-4">Customers</h2>
        <p>
          <PrimaryLink to={`/customers/create/`}>Create New</PrimaryLink>
        </p>
        <Table columns={this.columns} data={this.prepareData(customers)} />
        <Pagination
          currentPage={this.getCurrentPage(location)}
          totalCount={totalCount}
          {...this.pagination}
        />
      </>
    );
  }
}

CustomerList.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  message: PropTypes.string,
  status: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  onClickModalCancelButton: PropTypes.func.isRequired,
  onClickModalDeleteButton: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
};

export default withAlert(withDeleteModal(CustomerList));
