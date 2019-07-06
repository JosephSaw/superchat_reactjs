import { UPDATE_CHATROOMS, CHANGE_CURRENT_ROOM } from '../actions/types';

function chatroomsReducer(state = { chatrooms: [], currentRoomId: '', currentRoomName: '' }, action) {
    switch (action.type) {
        case UPDATE_CHATROOMS:
            return { ...state, chatrooms: [...action.payload] };

        case CHANGE_CURRENT_ROOM:
            return { ...state, currentRoomId: action.payload.roomId, currentRoomName: action.payload.roomName }

        default:
            return state;

    }
}

export default chatroomsReducer;