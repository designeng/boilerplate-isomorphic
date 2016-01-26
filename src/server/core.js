import wire from 'essential-wire';
import coreSpec from './core.spec';

import conifureStoreSpec from '../common/spec/conifure.store.spec';

delete process.env.BROWSER;

// wire(coreSpec).then((res) => {
//     // console.log("RES:", res);
// }).otherwise((error) => console.log("ERROR:", error));

wire(conifureStoreSpec).then((res) => {
    // console.log("RES:", res);
}).otherwise((error) => console.log("ERROR:", error));