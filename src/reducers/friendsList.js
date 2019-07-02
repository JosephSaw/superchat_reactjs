import { UPDATE_FRIENDS_LIST } from '../actions/types';

function friendsListReducer(state = [], action) {

    switch (action.type) {
        case UPDATE_FRIENDS_LIST:
            return action.payload;

        default:
            return state;
    }
}

export default friendsListReducer;