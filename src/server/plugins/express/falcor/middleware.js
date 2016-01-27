import FalcorServer from 'falcor-express';

function addFalcorMiddleware(resolver, facet, wire) {
    let target = facet.target;
    const api = facet.options.api;
    api.forEach((item) => {
        target.use(
            item.apiPath, 
            FalcorServer.dataSourceRoute(() => new item.router)
        );
    })
    resolver.resolve(target);
}

export default function ExpressFalcorMiddlewarePlugin(options) {
    return {
        facets: {
            falcorMiddleware: {
                initialize: addFalcorMiddleware
            }
        }
    }
}