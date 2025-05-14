import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } }); // allow TD too

app.use(express.static('public'));

// relay EVERY ui message to EVERYONE
io.on('connection', socket => {
  socket.on('ui', data => io.emit('ui', data));
});

const PORT = process.env.PORT || 3000;   // ✔ Railway injects PORT
httpServer.listen(PORT, () =>
  console.log(`🟢 control panel on http://localhost:${PORT}`)
);
