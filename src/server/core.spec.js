import wireDebugPlugin from 'essential-wire/source/debug';
import webpackConfig from '../../webpack.config';
import expressAppPlugin from './plugins/express/app';

export default {
    $plugins:[
        wireDebugPlugin,
        expressAppPlugin
    ],
    app: {
        createExpressApplication: {
            
        },
        addWebpackMiddleware: {
            webpackConfig: webpackConfig
        },
        startServer: {
            port: process.env.PORT || 3000
        }
    }
}