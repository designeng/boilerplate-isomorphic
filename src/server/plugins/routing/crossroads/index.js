import crossroads from 'crossroads';

let routers = {}

// factory
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
    routers.forEach( router => router.dispose());
}

// facets
function routesFacet(resolver, facet, wire) {
    let router      = facet.target;
    const routes    = facet.options.routes;

    routes.forEach( item => {
        router.addRoute(item.route, () => {
            console.log(item.component);
        });
    })
    
    resolver.resolve(target);
}

export default function RoutingSystemPlugin(options) {
    return {
        factories: {
            createRouter
        },
        facets: {
            routes: {
                initialize: routesFacet
            }
        },
        destroy: destroyRouters
    }
}