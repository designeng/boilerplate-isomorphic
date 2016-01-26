import wire from 'essential-wire';
import coreSpec from './core.spec';

delete process.env.BROWSER;

wire(coreSpec).then(function(res){
    // console.log("RES:", res);
}).otherwise(function(error){
    console.log("ERROR:", error);
});