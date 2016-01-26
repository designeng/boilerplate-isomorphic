import { createStore, applyMiddleware, compose } from 'redux';

import createLogger from 'redux-logger';

// factories

// options
//      rootReducer,
//      initialState
function configureStore(resolver, compDef, wire) {
    const rootReducer   = compDef.options.rootReducer;
    const initialState  = compDef.options.initialState;

    // {Object} middleware - {universal:..., browser:..., server:...}
    const middleware    = compDef.options.middleware;

    const getPlatformMiddleware = () => {
        let middleware = {};
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
            return [middleware].concat(middleware.server)
        }
    }

    const finalCreateStore = compose(...getPlatformMiddleware())(createStore);
    const store = finalCreateStore(rootReducer, initialState);
    resolver.resolve(store);
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