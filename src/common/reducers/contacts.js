import { 
    CONTACTS_GET, 
    CONTACTS_GET_REQUEST, 
    CONTACTS_GET_SUCCESS, 
    CONTACTS_GET_FAILURE 
} from '../actions/contacts';

export default function contacts(state = {isFetching: false, error: null}, action) {

    console.log("ACTION IN REDUCER::::", action);

    switch (action.type) {
        case CONTACTS_GET:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    contacts: action.contacts,
                });

        case CONTACTS_GET_REQUEST:
            /*ES6 Syntax for updating state with Object.assign(). */
            /* Create a new object, copy all props from old state and set isFetching to true */
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );
        case CONTACTS_GET_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    contacts: action.contacts,
                });
        case CONTACTS_GET_FAILURE:
            return Object.assign(
                {},
                state,
                {
                    error: action.error,
                    isFetching: false
                });

        default:
            return state;
    }
}