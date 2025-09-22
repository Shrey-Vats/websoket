import { WebSocketServer, WebSocket } from "ws";
import express from "express";
const app = express();
const httpServer = app.listen(8080);
const wss = new WebSocketServer({ server: httpServer });
wss.on("connection", (ws) => {
    ws.on("error", console.error);
    ws.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send("hi i am server x");
    const s = setInterval(() => {
        ws.send((Math.random() * 100).toFixed(2));
    }, 1000);
    console.log(s);
});
//# sourceMappingURL=index.js.map