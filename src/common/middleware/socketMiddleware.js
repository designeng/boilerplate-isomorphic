import config from '../config';

import { 
    MESSAGE_SEND,
    MESSAGE_SEND_REQUEST,
    MESSAGE_FROM_SERVER,
    messagesGet
} from '../actions/messages';

let socket, _next;
if(process.env.NODE_ENV == "server"){
    socket = {
        emit: () => {},
        on: () => {}
    }
} else {
    socket = io(config.socketio.host);
}

socket.on(MESSAGE_FROM_SERVER, (data) => {
    // get all messages or add message to collection? 
    // it depends on whether socket message has usefull payload.
    // first variant:
    _next(messagesGet());
})

export default function socketMiddleware() {
    return next => action => {
        if(typeof _next == "undefined") _next = next;

        const { isSocketIoRequest, message, userId, type, ...rest } = action;

        if (!isSocketIoRequest) return next(action);

        if(type === MESSAGE_SEND) {
            socket.emit(MESSAGE_SEND, { message, userId });
            next({...rest, type: MESSAGE_SEND_REQUEST});
        }

    };
}