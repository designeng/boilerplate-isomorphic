import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';

function getStore(resolver, compDef, wire) {
    wire(compDef.options).then(options => {
        const storeBuilder      = options.storeBuilder;
        const user              = options.user;

        let store = storeBuilder({user: user});
        resolver.resolve(store);
    });
}

// options
//      rootReducer,
//      middleware
function getStoreBuilder(resolver, compDef, wire) {
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
        
        const storeBuilder = (initialState) => finalCreateStore(rootReducer, initialState);

        resolver.resolve(storeBuilder);
    })
}

export default function storeBuilderPlugin(options) {
    return {
        factories: {
            getStoreBuilder,
            getStore
        }
    }
}