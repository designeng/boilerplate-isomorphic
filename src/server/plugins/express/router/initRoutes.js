function expressApiRoutesMiddleware(resolver, facet, wire) {
    let target = facet.target;

    wire(facet.options).then(({ 
            api 
        }) => {
        api.forEach( item => {
            target.use(
                item.basePath, 
                item.router
            );
        });
        resolver.resolve(target);
    });
}

export default function InitRoutesPlugin(options) {
    return {
        facets: {
            expressApiRoutesMiddleware: {
                initialize: expressApiRoutesMiddleware
            }
        }
    }
}