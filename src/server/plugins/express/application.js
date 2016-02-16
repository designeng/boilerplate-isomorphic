import express from 'express';

function startExpressServerFacet(resolver, facet, wire) {
    const port = facet.options.port;
    let target = facet.target;

    target.listen(port, () => {
        if (facet.options.verbose === true){
            const host = server.address().address;
            const port = server.address().port;
            console.info("==> 🌎  Express app listening at http://%s:%s", host, port);
        }
    });

    resolver.resolve(target);
}

function createExpressApplication(resolver, compDef, wire) {
    if (!compDef.options) {
        throw new Error("Please set true value to create Express application.")
    }

    const app = express();

    // for test client rendering only
    app.use(express.static('./public'));

    resolver.resolve(app);
}

export default function ExpressAppPlugin(options) {
    return {
        factories: {
            createExpressApplication
        },
        facets: {
            server: {
                ready: startExpressServerFacet
            }
        }
    }
}