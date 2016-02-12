export default function promiseMiddleware() {
    return next => action => {
        const { promise, type, ...rest } = action;

        if (!promise || rest.isFalcorRequest || rest.isFireBaseRequest) return next(action);

        console.log("promiseMiddleware....!!!!!!!!!!!!!!!!!!!!");

        const SUCCESS = type + '_SUCCESS';
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAILURE';
        
        next({...rest, type: REQUEST});

        return promise
            .then(response => {
                next({...rest, response, type: SUCCESS});
                return true;
            })
            .catch(error => {
                next({...rest, error, type: FAILURE});
                console.log(error);
                return false;
            });
    };
}