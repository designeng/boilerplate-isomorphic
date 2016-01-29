import wire from 'essential-wire';

import coreSpec             from './core.spec';
import conifureStoreSpec    from '../common/spec/conifure.store.spec';

// import userSpec             from '../modules/user/user.spec';

delete process.env.BROWSER;

wire(conifureStoreSpec).then((context) => {
    context.wire(coreSpec).then((_context) => {
        // console.log("RES::::::", _context);
    }).otherwise((error) => console.log("ERROR coreSpec:", error));
}).otherwise((error) => console.log("ERROR conifureStoreSpec:", error));