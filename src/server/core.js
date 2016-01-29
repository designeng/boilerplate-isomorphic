import wire from 'essential-wire';

import coreSpec             from './core.spec';
import conifureStoreSpec    from '../common/spec/conifure.store.spec';
import userSpec             from './modules/user/user.spec';

delete process.env.BROWSER;

// TODO: refactor this wrapping
wire(userSpec).then((context) => {
    context.wire(conifureStoreSpec).then((context) => {
        context.wire(coreSpec).then((context) => {

        }).otherwise((error) => console.log("ERROR coreSpec:", error));
    }).otherwise((error) => console.log("ERROR coreSpec:", error));
}).otherwise((error) => console.log("ERROR conifureStoreSpec:", error));