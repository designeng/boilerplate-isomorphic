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

import promiseMiddleware    from '../middleware/promiseMiddleware';
import expressApiMiddleware from '../middleware/expressApiMiddleware';
import falcorMiddleware     from '../middleware/falcorMiddleware';
import socketMiddleware     from '../middleware/socketMiddleware';
// ---------- /imported middlewares -----------


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

    universalMiddleware: [
        thunk,
        expressApiMiddleware,
        falcorMiddleware,
        socketMiddleware,
        promiseMiddleware
    ],

    middleware: {
        universal: {$ref: 'universalMiddleware'},
        browser: {
            production: [
                historyMiddleware,
                socketMiddleware
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