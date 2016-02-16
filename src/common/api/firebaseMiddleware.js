import { 
    CONTACTS_GET, 
    CONTACTS_GET_REQUEST, 
    CONTACTS_GET_SUCCESS, 
    CONTACTS_GET_FAILURE 
} from '../actions/contacts';

export default function falcorMiddleware() {
    return next => action => {
        const { promise, isFalcorRequest, type, ...rest } = action;

        if (!promise && !isFalcorRequest) return next(action);

        return promise
            .then(list => {
                if (list === null) {
                    var error = new Error('No data.');
                    next({...rest, error, type: CONTACTS_GET_FAILURE});
                } else {
                    next({
                        ...rest, 
                        list,
                        type: CONTACTS_GET_SUCCESS
                    });
                }
            })
            .catch(error => {
                console.log("contacts::ERROR::", error[0]);
                next({...rest, error, type: CONTACTS_GET_FAILURE});
            })
    };
}