import socket from 'socket.io';
import http from 'http';

function createSocketIOServer(resolver, compDef, wire) {
    wire(compDef.options).then(({ app, port, verbose }) => {
        const server = http.Server(app);
        const io = socket(server);

        server.listen(port, () => {
            if (verbose === true){
                const host = server.address().address;
                const port = server.address().port;
                console.info("==> 🌎  Express app listening at http://%s:%s", host, port);
            }
        });

        resolver.resolve(io);
    })
}

export default function SocketIOPlugin(options) {
    return {
        factories: {
            createSocketIOServer
        }
    }
}