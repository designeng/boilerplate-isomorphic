import express from 'express';

// facets
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
function expressApplication(resolver, compDef, wire) {
    if (!compDef.options) {
        throw new Error("Please set true value to create Express application.")
    }
    const app = express();
    resolver.resolve(app);
}

export default function ExpressAppPlugin(options) {
    return {
        factories: {
            expressApplication
        },
        facets: {
            server: {
                initialize: startExpressServer
            }
        }
    }
}