import { Component } from 'react';

const withDeleteModal = OriginalComponent =>
  class WithDeleteModal extends Component {
    state = {
      isModalOpen: false,
      idToDelete: null,
    };

    openModal = id => event => {
      event.preventDefault();
      console.log();
      this.setState({ isModalOpen: true, idToDelete: id });
    };

    onClickModalDeleteButton = (service, errorCb, dataCb) => event => {
      event.preventDefault();
      this.setState({ isModalOpen: false });
      if (this.state.idToDelete) {
        service.delete(this.state.idToDelete).then(data => {
          this.setState({ idToDelete: null });
          if (data.error) {
            errorCb(data.error);
          } else {
            dataCb();
          }
        });
      }
    };

    onClickModalCancelButton = event => {
      event.preventDefault();
      this.setState({ isModalOpen: false });
    };

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          openModal={this.openModal}
          onClickModalDeleteButton={this.onClickModalDeleteButton}
          onClickModalCancelButton={this.onClickModalCancelButton}
        />
      );
    }
  };

export default withDeleteModal;
