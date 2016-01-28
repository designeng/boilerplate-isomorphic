import crossroads from 'crossroads';

let routers = {}

function createRouter(resolver, compDef, wire) {
    let router;
    if (!compDef.options.name) {
        throw new Error("Router name should be defined!");
    }
    if (compDef.options.name && routers[compDef.options.name]) {
        router = routers[name];
    } else {
        router = crossroads.create();
    }
    resolver.resolve(router);
}

function destroyRouters(resolver, wire) {
    resolver.resolve(routers.forEach( router => router.dispose()));
}

function routesFacet(resolver, facet, wire) {
    let target      = facet.target;
    const routes    = facet.options.routes;

    routes.forEach( item => {
        target.addRoute(item.route, () => {
            console.log(item.component);
        });
    })
    
    resolver.resolve(target);
}

module.exports = function RoutingSystemPlugin(options) {
    return {
        factories: {
            createRouter
        },
        facets: {
            initRoutes: {
                initialize: routesFacet
            }
        },
        destroy: destroyRouters
    }
}