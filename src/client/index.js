import wire         from 'essential-wire';

import reduxSpec    from '../common/spec/redux.spec';
import userSpec     from '../common/spec/user.spec';
import clientSpec   from './client.spec';

import devTools     from '../server/devtools'

// TODO: styles should be loaded with css-modules loader later for every component
import "../../styles/index.css";

// TODO: refactor this wrapping

wire(reduxSpec).then(context => {
    context.wire(userSpec).then(context => {
        context.wire(clientSpec).then(context => {

            // TODO: make it work properly
            // TODO: ERROR clientSpec: TypeError: __webpack_require__(...) is not a function(…)

            // if (process.env.NODE_ENV !== 'production'){
            //     // require('../server/devtools')(context.store, window);
            //     devTools(context.store, window);
            // }
        }).otherwise(error => console.error("ERROR clientSpec:", error));
    }).otherwise(error => console.error("ERROR userSpec:", error));
}).otherwise(error => console.error("ERROR reduxSpec:", error));