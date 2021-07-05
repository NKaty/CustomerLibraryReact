import { Route, Switch } from 'react-router-dom';
import AddressList from './AddressList';
import AddressForm from './AddressForm';

function AddressRouter({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={AddressList} />
      <Route path={`${path}/add`} component={AddressForm} />
      <Route path={`${path}/edit/:addressId`} component={AddressForm} />
    </Switch>
  );
}

export default AddressRouter;
