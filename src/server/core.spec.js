import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import wildcardRoutePlugin  from './plugins/express/router/wildcard';
import expressFalcorPlugin  from './plugins/express/falcor/middleware';
import webpackPlugin        from './plugins/express/webpack/middleware';

import webpackConfig        from '../../webpack.config';

import NavigationRouter     from './api/falcor/routers/navigation';
import NewsRouter           from './api/falcor/routers/news';
import routes               from '../common/routes';

export default {
    $plugins: [
        wireDebugPlugin,
        expressAppPlugin,
        wildcardRoutePlugin,
        expressFalcorPlugin,
        webpackPlugin
    ],
    app: {
        expressApplication: true,
        webpackMiddleware: {
            webpackConfig: webpackConfig
        },
        falcorMiddleware: {
            api: [
                {apiPath: '/navigation/model.json' , router: NavigationRouter},
                {apiPath: '/news/model.json'       , router: NewsRouter}
            ]
        },
        wildcardRouteMiddleware: {
            routes: routes
        },
        server: {
            port: process.env.PORT || 3000,
            verbose: true
        }
    }
}