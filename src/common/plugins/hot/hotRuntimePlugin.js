const acceptHotRuntimeFacet = (resolver, facet, wire) => {
    let target = facet.target;
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        // with great respect to webpack:
        module.hot.accept('../../reducers', () => {
            const nextRootReducer = require('../../reducers');
            target.replaceReducer(nextRootReducer);
        });
    }
    resolver.resolve(target);
}

export default function hotRuntimePlugin(options) {
    return {
        facets: {
            acceptHotRuntime: {
                ready: acceptHotRuntimeFacet
            }
        }
    }
}