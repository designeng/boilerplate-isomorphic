import request from 'axios';

export const MESSAGE_GET = 'MESSAGE_GET';
export const MESSAGES_GET_FAILURE = 'MESSAGES_GET_FAILURE';
export const MESSAGES_GET_SUCCESS = 'MESSAGES_GET_SUCCESS';

export const MESSAGE_SEND = 'MESSAGE_SEND';
export const MESSAGE_SEND_REQUEST = 'MESSAGE_SEND_REQUEST';
export const MESSAGE_FROM_SERVER = 'MESSAGE_FROM_SERVER';

export function messageSend(data) {
    return {
        type                : MESSAGE_SEND,
        isSocketIoRequest   : true,
        message             : data.message,
        userId              : data.userId
    };
}

export function messageGet(data) {
    return {
        type                : MESSAGE_GET,
        promise             : request.get('https://localhost:3000/api/messages'),
        isSocketIoRequest   : false,
    };
}