import { UPDATE_CHATROOMS } from '../actions/types';

function chatroomsReducer(state = [], action) {
    switch (action.type) {
        case UPDATE_CHATROOMS:
            return action.payload;

        default:
            return state;

    }
}

export default chatroomsReducer;