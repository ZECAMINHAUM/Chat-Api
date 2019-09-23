const app = require('express')();
const dataHandler = require('../utils/messagesHandler');

const server = require('http').Server(app);
const io = require('socket.io')(server);
require('dotenv').config();

io.on('connection', async socket => {
    console.info(`Socket: ${socket.id}`);

    socket.emit('Messages', await dataHandler.getMessages());
    socket.on('SendMessage', data => {
        let response = dataHandler.sendMessage(data);

        socket.emit('MessageReceived', response);
        socket.broadcast.emit('MessageReceived', response);
    });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
});

