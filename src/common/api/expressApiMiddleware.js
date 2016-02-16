import { 
    MESSAGES_GET,
    MESSAGES_GET_FAILURE
} from '../actions/messages';

export default function expressApiMiddleware() {
    return next => action => {

        const { promise, type, ...rest } = action;

        if (!promise && type !== MESSAGES_GET) return next(action);

        return promise
            .then(messages => {
                console.log("MESSAGES:::::", messages);
                if (messages === null) {
                    var error = new Error('No data.');
                    next({...rest, error, type: MESSAGES_GET_FAILURE});
                    return false;
                } else {
                    console.log("messages:::", messages);

                    next({...rest, error, messages, type: MESSAGES_GET_SUCCESS});
                    return contacts;
                }

                return true;
            })
    };
}