import { UPDATE_PENDING_FRIEND_REQUESTS } from '../actions/types';

function pendingFriendRequestsReducer(state = [], action) {
    switch (action.type) {
        case UPDATE_PENDING_FRIEND_REQUESTS:
            return action.payload;

        default:
            return state;
    }

}

export default pendingFriendRequestsReducer;