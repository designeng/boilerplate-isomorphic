// this spec should be wired in core.js with conifure.store.spec

import wireDebugPlugin  from 'essential-wire/source/debug';
import when             from 'when';

// custom plugins
import getUserPlugin        from '../../plugins/user/getUserPlugin';
import isAuthorizedPlugin   from '../../plugins/user/isAuthorizedPlugin';

const getUserPromise = when.promise((resolve, reject) => {
    setTimeout(() => {
        resolve({name: 'John'})
    }, 100);
});

export default {
    $plugins: [
        wireDebugPlugin,
        getUserPlugin,
        isAuthorizedPlugin
    ],

    user: {
        getUser: getUserPromise
    },

    authorized: {
        isAuthorized: {
            user: {$ref: 'user'}
        }
    },

    store: {
        getStore: {
            user: {$ref: 'user'}
        }
    }
}