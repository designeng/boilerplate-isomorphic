import request from 'axios';

export const MESSAGES_GET_REQUEST = 'MESSAGES_GET';
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

export function messagesGet(data) {
    return {
        type                : MESSAGES_GET_REQUEST,
        promise             : request.get('/api/messages'),
        isMessageExpressApiRequest   : true,
    };
}