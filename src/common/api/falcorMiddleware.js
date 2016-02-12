export default function falcorMiddleware() {
    return next => action => {

        console.log("falcorMiddleware!!!!!!:::::", action.req);
        /* destructuring action object to local variables*/
        const { promise, isFalcorRequest, type, ...rest } = action;

        /* filter out all requests, that is not a Firebase promise */
        if (!promise || !isFalcorRequest) return next(action);

        console.log("isFalcorRequest:::::", isFalcorRequest);

        const REQUEST = type + '_REQUEST';
        const SUCCESS = type + '_SUCCESS';
        const FAILURE = type + '_FAILURE';

        /*triggers CONTACTS_GET_REQUEST action*/
        next({...rest, type: REQUEST});

        return promise
            .then(req => {
                let contacts;

                console.log("RESULT::::", req, req.data);
                // var data = req.data;
                // if (data === null) {
                //     var error = new Error('No data.');
                //     next({...rest, error, type: FAILURE});
                //     return false;
                // }
                /*conversion fb data from obj to array*/
                // if (data) {
                //     if (typeof data === "object") {
                //         articles = Object.keys(data).map(key=> {
                //             let article = data[key];
                //             article.key = key;
                //             return article;
                //         });
                //     } else {
                //         articles = data;
                //     }
                // }

                /* Slowing up request to see the loader*/
                next({...rest, contacts, type: SUCCESS});
                return true;
            })
    };
}