import { UPDATE_RECEIVED_FRIEND_REQUESTS } from '../actions/types';

function receivedFriendRequestsReducer(state = [], action) {
    switch (action.type) {
        case UPDATE_RECEIVED_FRIEND_REQUESTS:
            return action.payload;

        default:
            return state;
    }
}


export default receivedFriendRequestsReducer;