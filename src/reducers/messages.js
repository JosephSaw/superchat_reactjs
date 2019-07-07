import { FETCH_MESSAGES, SEND_MESSAGE, CHANGE_CURRENT_ROOM } from '../actions/types'
import messagesSnapshotReducer from './messagesSnapshot';

function messagesReducer(state = {}, action) {
    let newState = { ...state }

    switch (action.type) {
        case FETCH_MESSAGES:
            // if (newState[action.payload.roomId] && newState[action.payload.roomId][newState[action.payload.roomId].length].sending) {

            // } else {
            //     newState[action.payload.roomId] = action.payload.messages;
            // }
            newState[action.payload.roomId] = action.payload.messages;
            return newState;

        case SEND_MESSAGE:
            newState[action.payload.roomId] = action.payload.currentMessages;
            return newState;

        default:
            return state;
    }

}

export default messagesReducer;