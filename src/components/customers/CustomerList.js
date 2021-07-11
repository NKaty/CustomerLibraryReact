import { Component } from 'react';
import PrimaryLink from '../common/PrimaryLink';
import Table from '../common/Table';
import Spinner from '../common/Spinner';
import Pagination from '../common/Pagination';
import Modal from '../common/Modal';
import Alert from '../common/Alert';
import customerService from '../services/customer.service';

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
    isModalOpen: false,
    idToDelete: null,
    error: null,
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

  getData() {
    customerService.getPage(...this.getPageParams()).then(data => {
      if (data.error) {
        this.setState({ error: data.error, isLoading: false, isLoaded: true });
      } else {
        this.setState({
          customers: data.customers,
          totalCount: data.totalCount,
          isLoading: false,
          isLoaded: true,
        });
      }
    });
  }

  onClickDeleteButton = customerId => event => {
    event.preventDefault();
    this.setState({ isModalOpen: true, idToDelete: customerId });
  };

  onClickModalDeleteButton = event => {
    event.preventDefault();
    this.setState({ isModalOpen: false });
    if (this.state.idToDelete) {
      customerService.delete(this.state.idToDelete).then(data => {
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
    title: 'Delete customer',
    body: 'Are you sure you want to delete this customer?',
    cancelButtonLabel: 'Cancel',
    actionButtonLabel: 'Delete',
    onCancel: this.onClickModalCancelButton,
    onAction: this.onClickModalDeleteButton,
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
          <button
            onClick={this.onClickDeleteButton(item.customerId)}
            className="btn btn-link text-decoration-none text-primary d-inline m-0 p-0 align-top"
          >
            Delete
          </button>
        </>
      );
      return item;
    });
  }

  render() {
    const { isLoading, isModalOpen, customers, totalCount, error } = this.state;
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
        <h2 className="text-primary my-4">Customers</h2>
        <p>
          <PrimaryLink to={`/customers/create/`}>Create New</PrimaryLink>
        </p>
        <Table columns={this.columns} data={this.prepareData(customers)} />
        <Pagination
          currentPage={this.getCurrentPage(this.props.location)}
          totalCount={totalCount}
          {...this.pagination}
        />
      </>
    );
  }
}

export default CustomerList;
