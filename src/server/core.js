import wire from 'essential-wire';
import coreSpec from './core.spec';

import conifureStoreSpec from '../common/spec/conifure.store.spec';

delete process.env.BROWSER;

// wire(coreSpec).then((res) => {
//     // console.log("RES:", res);
// }).otherwise((error) => console.log("ERROR:", error));

wire(conifureStoreSpec).then((context) => {
    context.wire(coreSpec).then((_context) => {
        console.log("RES::::::", _context.middleware);
    }).otherwise((error) => console.log("ERROR coreSpec:", error));
}).otherwise((error) => console.log("ERROR conifureStoreSpec:", error));