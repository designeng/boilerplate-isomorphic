import wireDebugPlugin      from 'essential-wire/source/debug';

// custom plugins
import getCurrentUserPlugin from './plugins/user/getCurrentUserPlugin';

import { getUser }      from '../../../../common/api/user';

import routes           from '../common/routes';

export default {
    $plugins: [
        wireDebugPlugin,
        getCurrentUserPlugin
    ],
    user: {
        getUser
    }
    expressRoutingMiddleware: {

    }
}