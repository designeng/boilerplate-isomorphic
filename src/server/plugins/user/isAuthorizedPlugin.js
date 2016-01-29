export default function isAuthorizedPlugin(options) {
    
    const isAuthorized = (resolver, compDef, wire) => {
        wire(compDef.options).then((options) => {
            const user = options.user;
            resolver.resolve(!!user && !!user.name);
        });
    }

    return {
        factories: {
            isAuthorized
        }
    }
}