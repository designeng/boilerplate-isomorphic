import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import user from './user';
import article from './article';
import contacts from './contacts';
import messages from './messages';

const rootReducer = combineReducers({
    user      : user,
    article   : article,
    contacts  : contacts,
    messages  : messages,
    router    : routerStateReducer
});

export default rootReducer;