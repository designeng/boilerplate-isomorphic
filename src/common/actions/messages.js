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