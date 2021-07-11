import { Route, Switch } from 'react-router-dom';
import NoteList from './NoteList';
import NoteFormPage from './NoteFormPage';
import PropTypes from 'prop-types';

function NoteRouter({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={NoteList} />
      <Route path={`${path}/create`} component={NoteFormPage} />
      <Route path={`${path}/edit/:noteId`} component={NoteFormPage} />
    </Switch>
  );
}

NoteRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default NoteRouter;
