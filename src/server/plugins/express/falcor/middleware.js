import FalcorServer from 'falcor-express';

function addFalcorMiddleware(resolver, facet, wire) {
    let target = facet.target;
    const api = facet.options.api;
    api.forEach((item) => {
        console.log(">>>>>>>", item.apiPath);
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
            addFalcorMiddleware: {
                initialize: addFalcorMiddleware
            }
        }
    }
}