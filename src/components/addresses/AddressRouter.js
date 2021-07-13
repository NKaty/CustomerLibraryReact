import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddressList from './AddressList';
import AddressFormPage from './AddressFormPage';

function AddressRouter({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={AddressList} />
      <Route path={`${path}/create`} component={AddressFormPage} />
      <Route path={`${path}/edit/:addressId`} component={AddressFormPage} />
    </Switch>
  );
}

AddressRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AddressRouter;
