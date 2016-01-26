import { createStore, applyMiddleware, compose } from 'redux';

import createLogger from 'redux-logger';

// factories

// options
//      rootReducer,
//      initialState
function configureStore(resolver, compDef, wire) {
    const getPlatformMiddleware = (middleware) => {
        let universalMiddleware = middleware.universal;

        if (process.browser) {
            if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
                /* Production */
                middleware = applyMiddleware(...universalMiddleware);
                return [
                    middleware
                ].concat(middleware.browser.production)
            } else {
                /* Development */
                middleware = applyMiddleware(...universalMiddleware, createLogger());
                return [
                    middleware
                ].concat(middleware.browser.development)
            }
        } else {
            /* Server Side */
            middleware = applyMiddleware(...universalMiddleware);
            // return [middleware].concat(middleware.server)
            return [middleware]
        }
    }
    
    wire(compDef.options).then((options) => {
        const rootReducer   = options.rootReducer;
        const initialState  = options.initialState;

        // {Object} middleware - {universal:..., browser:..., server:...}
        const middleware    = options.middleware;

        let _middleware = getPlatformMiddleware(middleware);
        console.log("_middleware:::", _middleware);

        const finalCreateStore = compose(..._middleware)(createStore);
        let store = finalCreateStore(rootReducer, initialState);

        console.log("store:::", store);
        resolver.resolve(store);
    })
}

// facets
function addWebpackMiddleware(resolver, facet, wire) {
    let target = facet.target;
    resolver.resolve(target);
}

export default function configureStorePlugin(options) {
    return {
        factories: {
            configureStore
        },
        facets: {
            addWebpackMiddleware: {
                initialize: addWebpackMiddleware
            }
        }
    }
}