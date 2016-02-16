import { 
    MESSAGE_SEND,
    MESSAGE_SEND_REQUEST
} from '../actions/messages';

export default function socket(state = {}, action) {

    console.log("ACTION IN SOCKET REDUCER::::", action);

    switch (action.type) {
        case MESSAGE_SEND:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                });

        case MESSAGE_SEND_REQUEST:
            /*ES6 Syntax for updating state with Object.assign(). */
            /* Create a new object, copy all props from old state and set isFetching to true */
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );

        default:
            return state;
    }
}