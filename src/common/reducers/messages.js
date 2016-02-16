import { 
    MESSAGE_SEND,
    MESSAGE_SEND_REQUEST,

    MESSAGES_GET_REQUEST,
    MESSAGES_GET_SUCCESS,
    MESSAGES_GET_FAILURE
} from '../actions/messages';

export default function messages(state = {}, action) {

    console.log("ACTION IN MESSAGES REDUCER::::", action.messages, action);

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
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );

        case MESSAGES_GET_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true,
                    error: false,
                });

        case MESSAGES_GET_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    messages: action.messages
                }
            );

        case MESSAGES_GET_FAILURE:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: true
                }
            );

        default:
            return state;
    }
}