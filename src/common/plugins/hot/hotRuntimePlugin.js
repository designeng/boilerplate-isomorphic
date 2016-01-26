const acceptHotRuntimeFacet = (resolver, facet, wire) => {
    const reducersPath = facet.options.reducersPath;
    let target = facet.target;
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(reducersPath, () => {
            const nextRootReducer = require(reducersPath);
            target.replaceReducer(nextRootReducer);
        });
    }
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