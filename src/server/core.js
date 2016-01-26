import wire from 'essential-wire';
import coreSpec from './core.spec';

wire(coreSpec).then(function(res){
    // console.log("RES:", res);
}).otherwise(function(error){
    console.log("ERROR:", error);
});