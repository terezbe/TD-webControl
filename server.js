// TD-webControl/server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Resolve paths (ES-modules don't have __dirname natively)
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app        = express();
const httpServer = createServer(app);
const io         = new Server(httpServer, { cors: { origin: '*' } });

// serve everything inside /public
app.use(express.static(join(__dirname, 'public')));

// relay any UI message to every connected client
io.on('connection', socket => {
  socket.on('ui', data => io.emit('ui', data));
});

const PORT = process.env.PORT || 3000; // Railway injects $PORT
httpServer.listen(PORT, () =>
  console.log(`🟢 TD-webControl running on port ${PORT}`)
);
