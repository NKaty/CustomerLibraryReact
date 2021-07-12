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

class DependentEntityList extends Component {
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
    const { showAlert, entity } = this.props;

    const customerId = this.getCustomerId();
    if (isNaN(customerId) || customerId === 0) {
      showAlert('Customer is not found.', 'error');
    }

    entity.service.getByCustomerId(customerId).then(data => {
      if (data.error) {
        this.setState({ isLoading: false, isLoaded: true });
        this.props.showAlert(data.errorTitle, 'error');
      } else {
        this.setState({
          entities: data,
          isLoading: false,
          isLoaded: true,
        });
      }
    });
  };

  getDeleteModalProps() {
    const {
      entity,
      onClickModalCancelButton,
      onClickModalDeleteButton,
      showAlert,
    } = this.props;

    return {
      title: `Delete ${entity.name}`,
      body: `Are you sure you want to delete this ${entity.name}?`,
      cancelButtonLabel: 'Cancel',
      actionButtonLabel: 'Delete',
      onCancel: onClickModalCancelButton,
      onAction: onClickModalDeleteButton(
        entity.service,
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
    const { location, openModal, entity } = this.props;
    return data.map(item => {
      item.actions = (
        <>
          <PrimaryLink to={`${location.pathname}edit/${item[entity.id]}/`}>
            Edit
          </PrimaryLink>
          &nbsp;|&nbsp;
          <ButtonLink
            onClickButton={openModal(item[entity.id])}
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
    const { isModalOpen, message, status, closeAlert, entity, location } =
      this.props;

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
        <h2 className="text-primary my-4">{entity.listTitle}</h2>
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
        <Table columns={entity.columns} data={this.prepareData(entities)} />
      </>
    );
  }
}

DependentEntityList.propTypes = {
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
  entity: PropTypes.object.isRequired,
};

export default withAlert(withDeleteModal(DependentEntityList));
