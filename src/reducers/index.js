import { combineReducers } from 'redux';

import currentUserReducer from './currentUser';
import usersReducer from './users';
import messagesReducer from './messages';

export default combineReducers({
    currentUser: currentUserReducer,
    users: usersReducer,
    messages: messagesReducer
});