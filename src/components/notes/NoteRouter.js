import { Route, Switch } from 'react-router-dom';
import NoteList from './NoteList';
import NoteForm from './NoteForm';

function NoteRouter({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={NoteList} />
      <Route path={`${path}/add`} component={NoteForm} />
      <Route path={`${path}/edit/:noteId`} component={NoteForm} />
    </Switch>
  );
}

export default NoteRouter;
