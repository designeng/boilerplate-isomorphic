import Router from 'falcor-router';
import { Model } from 'falcor';
let $atom = Model.atom;

let data = {
    messages: [
        {text: "First message"}, 
        {text: "Second message"},
        {text: "Third message"}
    ],
};
    
const MessagesRouter = Router.createClass([
        {
            route: "messages",
            get: function() {
                return {path:["messages"], value: $atom(data.messages)};
            }
        },
        {
            route: 'messages.add',
            call: (callPath, args) => {
                console.log(callPath, args);
                // TODO

                console.log("callPath, args::::::", callPath, args);
            }
        }
    ]);

export default MessagesRouter;