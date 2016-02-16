// should be previously wired: 
//      redux.spec
//      user.spec

import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import socketIOPlugin       from './plugins/express/socket';

import wildcardRoutePlugin  from './plugins/express/router/wildcard';
import initApiRoutesPlugin  from './plugins/express/router/initRoutes';
import expressFalcorPlugin  from './plugins/express/falcor/middleware';
import webpackPlugin        from './plugins/express/webpack/middleware';

import webpackConfig        from '../../webpack.config';

import NavigationRouter     from './api/falcor/routers/navigation';
import ContactsRouter       from './api/falcor/routers/contacts';
import NewsRouter           from './api/falcor/routers/news';

import routes               from '../common/routes';

import apiRouter            from './api/express/routes';

export default {
    $plugins: [
        wireDebugPlugin,
        expressAppPlugin,
        wildcardRoutePlugin,
        initApiRoutesPlugin,
        expressFalcorPlugin,
        webpackPlugin,
        socketIOPlugin
    ],
    app: {
        createExpressApplication: true,
        webpackMiddleware: {
            webpackConfig: webpackConfig
        },
        falcorMiddleware: {
            api: [
                {apiPath: '/navigation/model.json' , router: NavigationRouter},
                {apiPath: '/news/model.json'       , router: NewsRouter},
                {apiPath: '/contacts/model.json'   , router: ContactsRouter}
            ]
        },
        expressApiRoutesMiddleware: {
            api: [
                {basePath: '/api' , router: apiRouter},
            ]
        },
        wildcardRouteMiddleware: {
            routes          : routes,
            store           : {$ref: 'store'},
            authorized      : {$ref: 'authorized'},
            messages        : {
                '401': 'Not Authorized',
                '404': 'Not found',
                '500': 'Internal server error'
            }
        }
    },

    // socketIo server will be started upon express application:
    socketIo: {
        createSocketIOServer: {
            app             : {$ref: 'app'},
            port            : process.env.PORT || 3000,
            verbose         : true
        }
    }
}