export const MESSAGE_SEND = 'MESSAGE_SEND';
export const MESSAGE_SEND_REQUEST = 'MESSAGE_SEND_REQUEST';

export function messageSend(message) {
    return {
        type: MESSAGE_SEND,
        isSocketIoRequest: true,
        message: message
    };
}