import wireDebugPlugin              from 'essential-wire/source/debug';
import reactRenderProviderPlugin    from '../common/plugins/react/rendering/provider';

import routes from '../common/routes';

const rootElement   = document.getElementById('root');

export default {
    $plugins: [
        wireDebugPlugin,
        reactRenderProviderPlugin
    ],

    Provider: {
        renderRootProvider: {
            storeBuilder  : {$ref: 'storeBuilder'},
            rootElement,
            routes
        }
    }
}