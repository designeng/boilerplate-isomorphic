import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import user from './user';
import article from './article';
import contacts from './contacts';

const rootReducer = combineReducers({
    user      : user,
    article   : article,
    contacts  : contacts,
    router    : routerStateReducer
});

export default rootReducer;