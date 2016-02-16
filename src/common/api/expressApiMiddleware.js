import { 
    MESSAGES_GET_REQUEST,
    MESSAGES_GET_FAILURE,
    MESSAGES_GET_SUCCESS
} from '../actions/messages';

export default function expressApiMiddleware() {
    return next => action => {

        const { promise, type, isMessageExpressApiRequest, ...rest } = action;

        if (!isMessageExpressApiRequest) return next(action);

        return promise
            .then(messages => {
                if (messages === null) {
                    var error = new Error('No data.');
                    next({...rest, error, type: MESSAGES_GET_FAILURE});
                    return false;
                } else {
                    messages = messages.data.messages;
                    next({...rest, error, messages, type: MESSAGES_GET_SUCCESS});
                    return messages;
                }
                return true;
            })
            .catch(error => {
                console.error(error);
            })
    };
}