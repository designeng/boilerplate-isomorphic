import { 
    MESSAGE_ADD,
    MESSAGE_SEND,
    MESSAGE_SEND_REQUEST,

    MESSAGES_GET_REQUEST,
    MESSAGES_GET_SUCCESS,
    MESSAGES_GET_FAILURE
} from '../actions/messages';

export default function messages(state = {}, action) {

    

    switch (action.type) {
        case MESSAGE_ADD:
            console.log("ACTION:::", action, action.payload);

            let newMessage = Object.assign({}, action.payload.message, { 
                id: Date.now()
            });

            let messages = action.payload.presentMessages;
            messages.push(newMessage);

            return Object.assign(
                {},
                state,
                {
                    messages: messages,
                    isFetching: false,
                    error: false,
                });

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
                    // hack!
                    messages: action.messages || action.response.data.messages
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