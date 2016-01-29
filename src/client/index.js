import wire from 'essential-wire';

import clientSpec           from './client.spec';
import conifureStoreSpec    from '../common/spec/redux.spec';

// TODO: styles should be loaded with css-modules loader later for every component
import "../../styles/index.css";

wire(conifureStoreSpec).then((conifureStoreContext) => {
    conifureStoreContext.wire(clientSpec).then((context) => {
        // console.log("CLIENT context:::", context);
    }).otherwise((error) => console.log("ERROR coreSpec:", error));
}).otherwise((error) => console.log("ERROR conifureStoreSpec:", error));