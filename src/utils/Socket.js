import io from 'socket.io-client';

export const socket = io.connect(`http://192.168.56.1:3001`);

export const SocketRequest = (payload) => {
    const {type, body} = payload;
    switch (type) {
        case "add-user":
            socket.emit("add-user", body.username);
            break;
        case "send_private_message":
            console.log(body)
            socket.emit("send_private_message", body);
            break;
        default:
            break;
    }
}