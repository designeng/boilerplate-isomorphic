import express from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// facets
function addWebpackMiddleware(resolver, facet, wire) {
    const webpackConfig = facet.options.webpackConfig;
    const compiler = webpack(webpackConfig);
    let target = facet.target;
    target.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
    target.use(webpackHotMiddleware(compiler));
    resolver.resolve(target);
}

function startExpressServer(resolver, facet, wire) {
    const port = facet.options.port;
    let target = facet.target;
    const server = target.listen(port, () => {
        if (facet.options.verbose === true){
            const host = server.address().address;
            const port = server.address().port;
            console.info("==> 🌎  Express app listening at http://%s:%s", host, port);
        }
    });
    resolver.resolve(target);
}

// factories
function createExpressApplication(resolver, compDef, wire) {
    const app = express();
    resolver.resolve(app);
}

export default function ExpressAppPlugin(options) {
    return {
        factories: {
            createExpressApplication
        },
        facets: {
            addWebpackMiddleware: {
                initialize: addWebpackMiddleware
            },
            startServer: {
                initialize: startExpressServer
            }
        }
    }
}