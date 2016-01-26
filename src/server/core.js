import wire from 'essential-wire';
import coreSpec from './core.spec';

delete process.env.BROWSER;

wire(coreSpec).then((res) => {
    // console.log("RES:", res);
}).otherwise((error) => console.log("ERROR:", error));