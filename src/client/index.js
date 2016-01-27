import wire from 'essential-wire';

import clientSpec           from './client.spec';
import conifureStoreSpec    from '../common/spec/conifure.store.spec';

import "../../styles/index.css";

wire(conifureStoreSpec).then((conifureStoreContext) => {
    conifureStoreContext.wire(clientSpec).then((context) => {
        // console.log("CLIENT context:::", context);
    }).otherwise((error) => console.log("ERROR coreSpec:", error));
}).otherwise((error) => console.log("ERROR conifureStoreSpec:", error));