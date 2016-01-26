// wire plugins
import wireDebugPlugin      from 'essential-wire/source/debug';
import configureStorePlugin from '../plugins/redux/configureStorePlugin'
import hotRuntimePlugin     from '../plugins/hot/hotRuntimePlugin'
import chromeDevToolsPlugin from '../plugins/devtools/chromeDevToolsPlugin'

import { devTools }         from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import createHistory        from 'history/lib/createBrowserHistory';

// reducer
import rootReducer          from '../reducers/index';

// ---------- middlewares -----------
// universal middleware
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import promiseMiddleware from '../api/promiseMiddleware';
import firebaseMiddleware from '../api/firebaseMiddleware';
// ---------- /middlewares -----------

const historyMiddleware = reduxReactRouter({
    createHistory
});

const initialState = {}

export default {
    $plugins: [
        wireDebugPlugin,
        configureStorePlugin,
        hotRuntimePlugin,
        chromeDevToolsPlugin
    ],
    chromeDevTools: {
        getChromeDevTools: {}
    },
    universalMiddleware: [thunk, promiseMiddleware, firebaseMiddleware],
    middleware: {
        browser: [
            historyMiddleware,
            {$ref: 'chromeDevTools'},
            devTools()
        ],
        server: [],
    },
    store: {
        configureStore: {
            rootReducer,
            initialState
        },
        acceptHotRuntime: {
            reducersPath: '../reducers'
        }
    }
}