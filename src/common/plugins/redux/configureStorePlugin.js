import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';

// options
//      rootReducer,
//      middleware
function getConfigureStore(resolver, compDef, wire) {
    const getPlatformMiddleware = (middleware) => {
        let universalMiddleware = middleware.universal;

        if (process.browser) {
            if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
                /* Production */
                return [
                    applyMiddleware(...universalMiddleware)
                ].concat(middleware.browser.production)
            } else {
                /* Development */
                return [
                    applyMiddleware(...universalMiddleware, createLogger())
                ].concat(middleware.browser.development)
            }
        } else {
            /* Server Side */
            return [
                applyMiddleware(...universalMiddleware)
            ].concat(middleware.server)
        }
    }
    
    wire(compDef.options).then((options) => {
        const rootReducer   = options.rootReducer;

        // {Object} middleware - {universal:..., browser:..., server:...}
        const middleware    = options.middleware;

        const finalCreateStore = compose(...getPlatformMiddleware(middleware))(createStore);
        
        const configureStore = (initialState) => finalCreateStore(rootReducer, initialState);

        resolver.resolve(configureStore);
    })
}

export default function configureStorePlugin(options) {
    return {
        factories: {
            getConfigureStore
        }
    }
}