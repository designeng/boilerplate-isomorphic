import when from 'when';
import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';

export const CONTACTS_GET = 'CONTACTS_GET';
export const CONTACTS_GET_REQUEST = 'CONTACTS_GET_REQUEST';
export const CONTACTS_GET_SUCCESS = 'CONTACTS_GET_SUCCESS';
export const CONTACTS_GET_FAILURE = 'CONTACTS_GET_FAILURE';

const model = new Falcor.Model({
    source: new FalcorDataSource('contacts/model.json')
});

const falcorPromise = () => {
    return when.promise(function(resolve, reject){
        model.getValue(['contacts'])
            .then(
                resolve,
                reject
            );
    })
}

export function contactsGet() {
    return {
        type: CONTACTS_GET,
        promise: falcorPromise,
        isFalcorRequest: true
    };
}