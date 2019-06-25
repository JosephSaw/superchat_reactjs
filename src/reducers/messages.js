import { FETCH_MESSAGES, SEND_MESSAGE } from '../actions/types'

function messagesReducer(state = {currentRoomId:'', messages: []}, action) {
    switch (action.type) {
        case FETCH_MESSAGES:
            return {...state, currentRoomId: action.payload.currentRoomId, messages: action.payload.messages};

        // case SEND_MESSAGE:
        //     console.log({state, action})
        //     return {...state, messages: [...state.messages, ...action.payload]}

        default:
            return state;
    }

}

export default messagesReducer;