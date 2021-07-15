import { Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import ContentLayout from './components/ContentLayout';
import CustomerRouter from './components/customers/CustomerRouter';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ContentLayout>
        <Switch>
          <Route path="/customers" component={CustomerRouter} />
          <Redirect from="*" to="/customers" />
        </Switch>
      </ContentLayout>
    </BrowserRouter>
  );
}

export default App;
