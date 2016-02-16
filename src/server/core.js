import wire from 'essential-wire';

import reduxSpec    from '../common/spec/redux.spec';
import userSpec     from '../common/spec/user.spec';
import coreSpec     from './core.spec';

import usersActivity    from './noop/users/activity';

delete process.env.BROWSER;

// TODO: refactor this wrapping
wire(reduxSpec).then(context => {
    context.wire(userSpec).then(context => {
        context.wire(coreSpec).then(context => {
            usersActivity(context.socketIo);
        }).otherwise(error => console.error("ERROR coreSpec:", error));
    }).otherwise(error => console.error("ERROR userSpec:", error));
}).otherwise(error => console.error("ERROR reduxSpec:", error));