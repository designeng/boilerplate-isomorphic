import models from "../../../server/api/express/models";

import { 
    MESSAGE_SEND,
    MESSAGE_SEND_REQUEST,
    MESSAGE_FROM_SERVER
} from '../../../common/actions/messages';

let counter = 0;

export default function usersActivity(io) {
    io.on('connection', function (socket) {

        setInterval(() => {
            const newMessage = {
                userId: "Robert",
                message: "Hello from server " + (counter++)
            }

            models.Message.create({
                userId  : newMessage.userId,
                text    : newMessage.message
            }).then(function (res) {
                socket.emit(MESSAGE_FROM_SERVER, newMessage);
            });
        }, 3000);
        
        socket.on(MESSAGE_SEND, function (data) {
            console.log(data);

            models.Message.create({
                userId  : data.userId,
                text    : data.message
            }).then(function (res) {
                console.log("MESSAGE INSERTED INTO DATABASE:::", res.dataValues.userId, " says:::", res.dataValues.text);
            });
        });
        
    });
}