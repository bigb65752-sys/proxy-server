const net = require('net');

const port = process.env.PORT || 10000;

const server = net.createServer((clientSocket) => {
    const serverSocket = net.connect(4444, 'localhost', () => {
        clientSocket.pipe(serverSocket);
        serverSocket.pipe(clientSocket);
    });

    clientSocket.on('error', (err) => {
        clientSocket.destroy();
    });

    serverSocket.on('error', (err) => {
        serverSocket.destroy();
    });
});

server.listen(port, () => {
    console.log(`Proxy running on port ${port}`);
});
