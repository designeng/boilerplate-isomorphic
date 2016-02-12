// import contactsModel from '../../models/falcor/contacts';

export const CONTACTS_GET = 'CONTACTS_GET';
export const CONTACTS_GET_REQUEST = 'CONTACTS_GET_REQUEST';
export const CONTACTS_GET_SUCCESS = 'CONTACTS_GET_SUCCESS';
export const CONTACTS_GET_FAILURE = 'CONTACTS_GET_FAILURE';

import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';

const contactsModel = new Falcor.Model({
    source: new FalcorDataSource('http://localhost:3000/contacts/model.json')
});

export function contactsGet() {
    console.log("contactsGet.................");

    return {
        type: CONTACTS_GET,
        promise: contactsModel.getValue(['contacts']),
        isFalcorRequest: true
    };
}