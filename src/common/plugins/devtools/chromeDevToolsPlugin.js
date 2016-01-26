// factories
function getChromeDevTools(resolver, compDef, wire) {
    let chromeDevTools;
    const invariant = f => f;
    if (process.browser) {
        chromeDevTools = window.devToolsExtension ? window.devToolsExtension() : invariant;
    } else {
        chromeDevTools = invariant;
    }
    resolver.resolve(chromeDevTools);
}


export default function chromeDevToolsPlugin(options) {
    return {
        factories: {
            getChromeDevTools
        }
    }
}