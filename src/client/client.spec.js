import wireDebugPlugin              from 'essential-wire/source/debug';
import reactRenderProviderPlugin    from '../common/plugins/react/rendering/provider';

import routes from '../common/routes';
import configureStore from '../common/store/configureStore';

const rootElement   = document.getElementById('root');

export default {
    $plugins: [
        wireDebugPlugin,
        reactRenderProviderPlugin
    ],

    Provider: {
        renderRootProvider: {
            configureStore  : {$ref: 'configureStore'},
            rootElement,
            routes
        }
    }
}