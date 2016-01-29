import wire         from 'essential-wire';

import reduxSpec    from '../common/spec/redux.spec';
import userSpec     from '../common/spec/user.spec';
import clientSpec   from './client.spec';

// TODO: styles should be loaded with css-modules loader later for every component
import "../../styles/index.css";

// TODO: refactor this wrapping
// TODO: ERROR clientSpec: TypeError: __webpack_require__(...) is not a function(…)

wire(reduxSpec).then(context => {
    context.wire(userSpec).then(context => {
        context.wire(clientSpec).then(context => {
            console.log("CLIENT context store:::", context.store);

            if (process.env.NODE_ENV !== 'production'){
                require('../server/devtools')(context.store, window);
            }
        }).otherwise(error => console.log("ERROR clientSpec:", error));
    }).otherwise(error => console.log("ERROR userSpec:", error));
}).otherwise(error => console.log("ERROR reduxSpec:", error));