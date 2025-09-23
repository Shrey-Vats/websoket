import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
const app = express();
const httpServer = app.listen(8080);
// const wss = new WebSocketServer({ server: httpServer });
// wss.on('connection', function connection(ws) {
//   ws.on('error', console.error);
//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
//   ws.send('Hello! Message From Server!!');
// });
const wss = new WebSocketServer({ server: httpServer });
wss.on("connection", (ws) => {
    ws.on("open", () => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("User x come on the chat");
            }
        });
    });
    ws.on("error", console.error);
    ws.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("message from user x :" + data, { binary: isBinary });
            }
        });
    });
    ws.on("close", () => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                ws.send("User x is offline now ");
            }
        });
    });
    ws.send("Hi ! there");
});
//# sourceMappingURL=index.js.map