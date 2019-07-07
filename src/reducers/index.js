import { combineReducers } from 'redux';

import currentUserReducer from './currentUser';
import usersReducer from './users';
import messagesSnapshotReducer from './messagesSnapshot';
import messagesReducer from './messages';
import pendingFriendRequestsReducer from './pendingFriendRequests';
import receivedFriendRequestsReducer from './receivedFriendRequests';
import friendsListReducer from './friendsList';
import chatroomsReducer from './chatrooms';
import toastReducer from './toast';

export default combineReducers({
    currentUser: currentUserReducer,
    users: usersReducer,
    messagesSnapshot: messagesSnapshotReducer,
    pendingFriendRequests: pendingFriendRequestsReducer,
    receivedFriendRequests: receivedFriendRequestsReducer,
    friendsList: friendsListReducer,
    chatrooms: chatroomsReducer,
    toast: toastReducer,
    messages: messagesReducer
});