import wireDebugPlugin  from 'essential-wire/source/debug';

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
    }
}