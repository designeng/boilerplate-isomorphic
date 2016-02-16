import { 
    MESSAGE_SEND,
    MESSAGE_SEND_REQUEST
} from '../../../common/actions/messages';

export default function usersActivity(io) {
    io.on('connection', function (socket) {

        setTimeout(() => {
            socket.emit('message_from_server', { hello: 'world' });
        }, 3000);
        
        socket.on(MESSAGE_SEND, function (data) {
            console.log(data);
        });
        
    });
}