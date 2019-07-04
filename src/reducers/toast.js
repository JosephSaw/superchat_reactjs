import { SHOW_TOAST, HIDE_TOAST } from '../actions/types';

function toastReducer(state = { animation: true, autohide: true, show: false, header: 'This is a test toast', body: 'Body toast me' }, action) {

    switch (action.type) {
        case HIDE_TOAST:
            return { ...state, ...action.payload, show: false };

        case SHOW_TOAST:
            return { ...state, ...action.payload, show: true };

        default:
            return state;

    }

}

export default toastReducer;