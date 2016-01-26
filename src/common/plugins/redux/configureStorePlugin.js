import { createStore, applyMiddleware, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// factories

// options
//      rootReducer,
//      initialState
function configureStore(resolver, compDef, wire) {
    const rootReducer = compDef.options.rootReducer;
    const initialState = compDef.options.initialState;
    
    resolver.resolve();
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