import wireDebugPlugin from 'essential-wire/source/debug';
import webpackConfig from '../../webpack.config';
import expressAppPlugin from './plugins/express/app';

const port = process.env.PORT || 3000;

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
            port: port
        }
    }
}