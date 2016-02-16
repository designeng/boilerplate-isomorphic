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

export default function socketMiddleware() {
    return next => action => {
        const { isSocketIoRequest, message, userId, type, ...rest } = action;

        console.log("expressApiMiddleware action::::::.....", action);

        if (!isSocketIoRequest) return next(action);

        if(type === MESSAGE_SEND) {
            socket.emit(MESSAGE_SEND, { message, userId });

            next({
                ...rest, 
                type: MESSAGE_SEND_REQUEST
            });
        }
    };
}