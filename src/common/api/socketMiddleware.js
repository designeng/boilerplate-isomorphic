import config from '../config';

import { 
    MESSAGE_SEND,
    MESSAGE_SEND_REQUEST
} from '../actions/messages';

if(process.env.NODE_ENV == "server"){
    const socket = {
        emit: () => {}
    }
} else {
    const socket = io(config.socketio.host);
}

export default function falcorMiddleware() {
    return next => action => {

        const { isSocketIoRequest, message, type, ...rest } = action;

        console.log("type:: isSocketIoRequest :::", type, isSocketIoRequest);

        if (!isSocketIoRequest) return next(action);

        if(type === MESSAGE_SEND) {
            console.log("TYPE:::::::::::::::", type);
            alert(type)
            socket.emit(MESSAGE_SEND, {message: message});

            next({
                        ...rest, 
                        type: MESSAGE_SEND_REQUEST
                });
        }
    };
}