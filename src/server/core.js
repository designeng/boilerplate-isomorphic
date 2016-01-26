import wire from 'essential-wire';
import wireDebug from 'essential-wire/source/debug';

wire({
    $plugins:[
        wireDebug
    ],
    test: 123,
    a: "a"
}).then(function(res){
    console.log("RES:", res);
}).otherwise(function(error){
    console.log("ERROR:", error);
});