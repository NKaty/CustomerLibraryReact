import { Redirect, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import ContentLayout from './components/ContentLayout';
import CustomerRouter from './components/customers/CustomerRouter';

function App() {
  return (
    <>
      <Header />
      <ContentLayout>
        <Switch>
          <Route path="/customers" component={CustomerRouter} />
          <Redirect from="*" to="/customers" />
        </Switch>
      </ContentLayout>
    </>
  );
}

export default App;
