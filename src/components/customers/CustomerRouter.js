import { Route, Switch } from 'react-router-dom';
import CustomerList from './CustomerList';
import CustomerFormPage from './CustomerFormPage';
import AddressRouter from '../addresses/AddressRouter';
import NoteRouter from '../notes/NoteRouter';
import PropTypes from 'prop-types';

function CustomerRouter({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={CustomerList} />
      <Route path={`${path}/create`} component={CustomerFormPage} />
      <Route path={`${path}/edit/:customerId`} component={CustomerFormPage} />
      <Route path={`${path}/:customerId/addresses`} component={AddressRouter} />
      <Route path={`${path}/:customerId/notes`} component={NoteRouter} />
    </Switch>
  );
}

CustomerRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CustomerRouter;
