import { combineReducers } from 'redux';

import currentUserReducer from './currentUser';
import usersReducer from './users';
import messagesReducer from './messages';
import pendingFriendRequestsReducer from './pendingFriendRequests';
import receivedFriendRequestsReducer from './receivedFriendRequests';
import friendsListReducer from './friendsList';

export default combineReducers({
    currentUser: currentUserReducer,
    users: usersReducer,
    messages: messagesReducer,
    pendingFriendRequests: pendingFriendRequestsReducer,
    receivedFriendRequests: receivedFriendRequestsReducer,
    friendsList: friendsListReducer,
    chatRooms: () => [{ roomName: 'Test', roomId: '123455', isPrivate: true, users: ['12434543', '14324672'] }]
});