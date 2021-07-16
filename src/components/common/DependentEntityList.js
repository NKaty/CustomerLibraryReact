import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PrimaryLink from '../common/PrimaryLink';
import Table from '../common/Table';
import ButtonLink from '../common/ButtonLink';
import Modal from '../common/Modal';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';
import withDeleteModal from '../hoc/withDeleteModal';
import withAlert from '../hoc/withAlert';

export class DependentEntityList extends Component {
  state = {
    entities: [],
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
    const { showAlert, entityProps } = this.props;

    const customerId = this.getCustomerId();
    if (isNaN(customerId) || customerId === 0) {
      this.setState({ isLoading: false, isLoaded: true });
      return showAlert('Customer is not found.', 'error');
    }

    entityProps.service.getByCustomerId(customerId).then(data => {
      if (data && data.error) {
        this.setState({ isLoading: false, isLoaded: true });
        showAlert(data.errorTitle, 'error');
      } else {
        this.setState({
          entities: data ?? [],
          isLoading: false,
          isLoaded: true,
        });
      }
    });
  };

  getDeleteModalProps() {
    const {
      entityProps,
      onClickModalCancelButton,
      onClickModalDeleteButton,
      showAlert,
    } = this.props;

    const { name, service } = entityProps;

    return {
      title: `Delete ${name}`,
      body: `Are you sure you want to delete this ${name}?`,
      cancelButtonLabel: 'Cancel',
      actionButtonLabel: 'Delete',
      onCancel: onClickModalCancelButton,
      onAction: onClickModalDeleteButton(
        service,
        error => showAlert(error, 'error'),
        this.getData
      ),
    };
  }

  onClickReturnButton = event => {
    event.preventDefault();
    this.props.history.goBack();
  };

  prepareData = data => {
    const {
      location,
      openModal,
      entityProps: { idName },
    } = this.props;

    return data.map(item => {
      item.actions = (
        <>
          <PrimaryLink to={`${location.pathname}edit/${item[idName]}/`}>
            Edit
          </PrimaryLink>
          &nbsp;|&nbsp;
          <ButtonLink
            onClickButton={openModal(item[idName])}
            label="Delete"
            disabled={data.length < 2}
          />
        </>
      );
      return item;
    });
  };

  render() {
    const { isLoading, entities } = this.state;
    const { isModalOpen, message, status, closeAlert, entityProps, location } =
      this.props;
    const { listTitle, columns } = entityProps;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <>
        {isModalOpen && <Modal {...this.getDeleteModalProps()} />}
        {message && (
          <Alert
            message={message}
            status={status}
            onClickCloseButton={closeAlert}
          />
        )}
        <h2 className="text-primary my-4">
          {listTitle +
            (location.state ? ` for customer ${location.state}` : '')}
        </h2>
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
        <Table columns={columns} data={this.prepareData(entities)} />
      </>
    );
  }
}

DependentEntityList.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  message: PropTypes.string,
  status: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  onClickModalCancelButton: PropTypes.func.isRequired,
  onClickModalDeleteButton: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
  entityProps: PropTypes.object.isRequired,
};

export default withRouter(withAlert(withDeleteModal(DependentEntityList)));
