import { Route, Switch } from 'react-router-dom';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import AddressRouter from '../addresses/AddressRouter';
import NoteRouter from '../notes/NoteRouter';

function CustomerRouter({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={CustomerList} />
      <Route path={`${path}/create`} component={CustomerForm} />
      <Route path={`${path}/edit/:customerId`} component={CustomerForm} />
      <Route path={`${path}/delete/:customerId`} component={CustomerForm} />
      <Route path={`${path}/:customerId/addresses`} component={AddressRouter} />
      <Route path={`${path}/:customerId/notes`} component={NoteRouter} />
    </Switch>
  );
}

export default CustomerRouter;
