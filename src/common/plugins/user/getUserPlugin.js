import when from 'when';

export default function getUserPlugin(options) {
    function getUserFactory(resolver, compDef, wire){
        let promise = compDef.options;
        when(promise).then((result) => resolver.resolve(result));
    }

    return {
        factories: {
            getUser: getUserFactory
        }
    }
}