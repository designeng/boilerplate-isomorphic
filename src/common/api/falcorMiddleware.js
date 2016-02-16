import { 
    CONTACTS_GET, 
    CONTACTS_GET_REQUEST, 
    CONTACTS_GET_SUCCESS, 
    CONTACTS_GET_FAILURE 
} from '../actions/contacts';

export default function falcorMiddleware() {
    return next => action => {

        /* destructuring action object to local variables*/
        const { promise, isContactsRequest, type, ...rest } = action;

        /* filter out all requests, that is not a Firebase promise */
        if (!isContactsRequest) return next(action);

        const REQUEST = type + '_REQUEST';
        const SUCCESS = type + '_SUCCESS';
        const FAILURE = type + '_FAILURE';

        /*triggers CONTACTS_GET_REQUEST action*/
        next({...rest, type: CONTACTS_GET_REQUEST});

        return promise
            .then(contacts => {
                if (contacts === null) {
                    var error = new Error('No data.');
                    next({...rest, error, type: CONTACTS_GET_FAILURE});
                    return false;
                } else {
                    next({...rest, error, contacts, type: CONTACTS_GET_SUCCESS});
                    return contacts;
                }

                return true;
            })
    };
}