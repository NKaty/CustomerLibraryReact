import { Component } from 'react';

const withAlert = OriginalComponent =>
  class WithDeleteModal extends Component {
    state = {
      message: null,
      status: null,
    };

    showAlert = (message, status) => {
      this.setState({ message, status });
    };

    closeAlert = () => {
      this.setState({ message: null, status: null });
    };

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          showAlert={this.showAlert}
          closeAlert={this.closeAlert}
        />
      );
    }
  };

export default withAlert;
