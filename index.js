const net = require('net');
const http = require('http');

// Render uses this PORT to keep the service alive
const PORT = process.env.PORT || 10000;

// This server performs a dual role to satisfy Render's health check
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running properly\n');
});

// Proxy logic to forward data to your Metasploit
const proxy = net.createServer((socket) => {
    console.log('Connection detected!');
    const client = net.createConnection({ port: 4444, host: '127.0.0.1' });
    
    socket.pipe(client);
    client.pipe(socket);
    
    socket.on('error', () => {});
    client.on('error', () => {});
});

// Start listening only on the Render-provided port
server.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP/TCP Proxy is live on port ${PORT}`);
});

// Attach proxy to the same server context
server.on('upgrade', (req, socket, head) => {
    proxy.emit('connection', socket);
});
