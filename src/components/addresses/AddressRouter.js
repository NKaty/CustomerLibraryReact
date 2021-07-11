import { Route, Switch } from 'react-router-dom';
import AddressList from './AddressList';
import AddressForm from './AddressForm';
import PropTypes from 'prop-types';

function AddressRouter({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={AddressList} />
      <Route path={`${path}/create`} component={AddressForm} />
      <Route path={`${path}/edit/:addressId`} component={AddressForm} />
    </Switch>
  );
}

AddressRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AddressRouter;
