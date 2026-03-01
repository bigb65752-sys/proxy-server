const net = require('net');
const http = require('http');
const PORT = process.env.PORT || 10000;

const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running properly\n');
});

const tcpServer = net.createServer((socket) => {
    const client = net.createConnection({ port: 4444, host: 'localhost' });
    socket.pipe(client);
    client.pipe(socket);
    socket.on('error', () => {});
    client.on('error', () => {});
});

tcpServer.listen(PORT, '0.0.0.0');
