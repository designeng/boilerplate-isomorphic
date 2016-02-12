import Router from 'falcor-router';
import { Model } from 'falcor';
let $atom = Model.atom;

let contacts = [
    {name: "John", key: 0}, 
    {name: "Bill", key: 1},
    {name: "Robert", key: 2},
    {name: "William", key: 3}
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