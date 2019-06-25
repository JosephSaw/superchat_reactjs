import { SUCCESSFUL_LOGIN } from '../actions/types';

function currentUserReducer(state = { loggedIn: false }, action) {
    switch (action.type) {
        case SUCCESSFUL_LOGIN:
            return { ...state, ...action.payload };

        default:
            return { ...state };
    }
}

export default currentUserReducer;