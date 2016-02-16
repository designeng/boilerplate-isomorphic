import config from '../config';

import { 
    MESSAGE_SEND,
    MESSAGE_SEND_REQUEST
} from '../actions/messages';

let socket;
if(process.env.NODE_ENV == "server"){
    socket = {
        emit: () => {}
    }
} else {
    socket = io(config.socketio.host);
}

export default function falcorMiddleware() {
    return next => action => {
        const { isSocketIoRequest, message, type, ...rest } = action;

        if (!isSocketIoRequest) return next(action);

        if(type === MESSAGE_SEND) {
            socket.emit(MESSAGE_SEND, {message: message});

            next({
                ...rest, 
                type: MESSAGE_SEND_REQUEST
            });
        }
    };
}