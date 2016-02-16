export default function usersActivity(io) {
    io.on('connection', function (socket) {

        setTimeout(() => {
            socket.emit('message_from_server', { hello: 'world' });
        }, 3000);
        
        socket.on('chat_click', function (data) {
            console.log(data);
        });
        
    });
}