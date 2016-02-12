import Router from 'falcor-router';
import { Model } from 'falcor';
let $atom = Model.atom;

let contacts = [
    {name: "John"}, 
    {name: "Bill"},
    {name: "Robert"},
    {name: "William"}
];
    
const ContactsRouter = Router.createClass([
        {
            route: "contacts",
            get: function() {
                return {path:["contacts"], value: $atom(contacts)};
            }
        },
        {
            route: 'contacts.add',
            call: (callPath, args) => {
                console.log(callPath, args);
                // TODO

                console.log("callPath, args::::::", callPath, args);
            }
        }
    ]);

export default ContactsRouter;