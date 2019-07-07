import { FETCH_MESSAGES, SEND_MESSAGE, CHANGE_CURRENT_ROOM } from '../actions/types'

function messagesSnapshotReducer(state = {}, action) {
    switch (action.type) {
        // case FETCH_MESSAGES:
        //     return { ...state, ...action.payload }

        default:
            return state;
    }

}

export default messagesSnapshotReducer;