import wireDebugPlugin from 'essential-wire/source/debug';
import webpackConfig from '../../webpack.config';
import expressAppPlugin from './plugins/express/app';
import wildcardRoutePlugin from './plugins/express/router/wildcard';
import routes from '../common/routes';

delete process.env.BROWSER;

export default {
    $plugins:[
        wireDebugPlugin,
        expressAppPlugin,
        wildcardRoutePlugin
    ],
    app: {
        createExpressApplication: {
            
        },
        addWebpackMiddleware: {
            webpackConfig: webpackConfig
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