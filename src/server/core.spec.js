import wireDebugPlugin from 'essential-wire/source/debug';
import webpackConfig from '../../webpack.config';
import expressAppPlugin from './plugins/express/app';
import wildcardRoutePlugin from './plugins/express/router/wildcard';
import expressFalcorPlugin from './plugins/express/falcor/middleware';
import NavigationRouter    from './api/falcor/routers/navigation';
import NewsRouter          from './api/falcor/routers/news';
import routes from '../common/routes';

export default {
    $plugins:[
        wireDebugPlugin,
        expressAppPlugin,
        wildcardRoutePlugin,
        expressFalcorPlugin
    ],
    app: {
        createExpressApplication: {},
        addWebpackMiddleware: {
            webpackConfig: webpackConfig
        },
        addFalcorMiddleware: {
            api: [
                {apiPath: '/navigation/model.json' , router: NavigationRouter},
                {apiPath: '/news/model.json'       , router: NewsRouter}
            ]
        },
        addWildcardRouteMiddleware: {
            routes: routes
        },
        startServer: {
            port: process.env.PORT || 3000,
            verbose: true
        }
    }
}