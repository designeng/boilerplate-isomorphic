import when from 'when';
import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';

export const CONTACTS_GET = 'CONTACTS_GET';
export const CONTACTS_GET_REQUEST = 'CONTACTS_GET_REQUEST';
export const CONTACTS_GET_SUCCESS = 'CONTACTS_GET_SUCCESS';
export const CONTACTS_GET_FAILURE = 'CONTACTS_GET_FAILURE';

const model = new Falcor.Model({
    source: new FalcorDataSource('http://localhost:3000/contacts/model.json')
});

const falcorPromise = () => {
    return when.promise(function(resolve, reject){
        // resolve(123);
        model.getValue(['contacts'])
            .then(
                resolve,
                reject
            );
    })
}

export function contactsGet() {
    console.log("contactsGet.................");

    // model.getValue(['contacts'])
    //     .then(
    //         (res) => {
    //             console.log("RES::::", res);
    //         },
    //         error => {
    //             console.error("ERROR:::::", error);
    //         }
    //     );

    return {
        type: CONTACTS_GET,
        promise: model.getValue(['contacts']),
        isFalcorRequest: true
    };
}