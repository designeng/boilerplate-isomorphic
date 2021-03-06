// wire plugins
import wireDebugPlugin      from 'essential-wire/source/debug';
import storeBuilderPlugin   from '../plugins/redux/storeBuilderPlugin'

import hotRuntimePlugin     from '../plugins/hot/hotRuntimePlugin'

import chromeDevToolsPlugin from '../plugins/devtools/chromeDevToolsPlugin'

import { devTools }         from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import createHistory        from 'history/lib/createBrowserHistory';

// reducer
import rootReducer          from '../reducers/index';

// ---------- imported middlewares -----------
// universal middleware
import thunk                from 'redux-thunk';

import promiseMiddleware    from '../api/promiseMiddleware';
import firebaseMiddleware   from '../api/firebaseMiddleware';
// ---------- /imported middlewares -----------

let universalMiddleware = [thunk, promiseMiddleware, firebaseMiddleware];

const historyMiddleware = reduxReactRouter({
    createHistory
});

export default {
    $plugins: [
        wireDebugPlugin,
        storeBuilderPlugin,
        hotRuntimePlugin,
        chromeDevToolsPlugin
    ],
    chromeDevTools: {
        getChromeDevTools: {}
    },
    middleware: {
        universal: universalMiddleware,
        browser: {
            production: [
                historyMiddleware,
            ],
            development: [
                historyMiddleware,
                {$ref: 'chromeDevTools'},
                devTools()
            ],
        },
        server: [
        ]
    },
    storeBuilder: {
        getStoreBuilder: {
            rootReducer,
            middleware: {$ref: 'middleware'}
        },
        acceptHotRuntime: {
        }
    }
}