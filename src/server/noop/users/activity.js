import models from "../../../server/api/express/models";

import { 
    MESSAGE_SEND,
    MESSAGE_SEND_REQUEST,
    MESSAGE_FROM_SERVER
} from '../../../common/actions/messages';

export default function usersActivity(io) {
    io.on('connection', function (socket) {

        setTimeout(() => {
            socket.emit(MESSAGE_FROM_SERVER, { message: 'hello world', userId: 'Richard' });
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