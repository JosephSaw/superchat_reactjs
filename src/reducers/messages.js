import { FETCH_MESSAGES, SEND_MESSAGE, CHANGE_CURRENT_ROOM } from '../actions/types'

function messagesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_MESSAGES:
            return { ...state, ...action.payload };

        // case SEND_MESSAGE:
        //     console.log({state, action})
        //     return {...state, messages: [...state.messages, ...action.payload]}

        default:
            return state;
    }

}

export default messagesReducer;