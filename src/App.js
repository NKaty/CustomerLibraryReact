import { Redirect, Switch, Route } from 'react-router-dom';
import CustomerRouter from './components/customers/CustomerRouter';

function App() {
  return (
    <Switch>
      <Route path="/customers" component={CustomerRouter} />
      <Redirect from="*" to="/customers" />
    </Switch>
  );
}

export default App;
