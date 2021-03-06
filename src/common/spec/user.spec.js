// should be previously wired: redux.spec

import wireDebugPlugin  from 'essential-wire/source/debug';
import when             from 'when';

// custom plugins
import getUserPlugin        from '../plugins/user/getUserPlugin';
import isAuthorizedPlugin   from '../plugins/user/isAuthorizedPlugin';
import storeBuilderPlugin   from '../plugins/redux/storeBuilderPlugin'

// TODO: create real async API invocation
// move it in user plugin?
const getUserPromise = when.promise((resolve, reject) => {
    setTimeout(() => {
        resolve({name: 'John'})
    }, 100);
});

export default {
    $plugins: [
        wireDebugPlugin,
        getUserPlugin,
        isAuthorizedPlugin,
        storeBuilderPlugin
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
            user            : {$ref: 'user'},
            storeBuilder    : {$ref: 'storeBuilder'}
        }
    }
}