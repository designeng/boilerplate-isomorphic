import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import user from './user';
import article from './article';

const rootReducer = combineReducers({
  user      : user,
  article   : article,
  router    : routerStateReducer
});

export default rootReducer;