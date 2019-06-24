import { FETCH_MESSAGES } from '../actions/types'

function messagesReducer(state = [], action) {
    switch (action.type) {
        case FETCH_MESSAGES:
            return [...action.payload];
        default:
            return state;
    }

}

export default messagesReducer;