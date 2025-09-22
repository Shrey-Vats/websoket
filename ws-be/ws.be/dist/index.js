import { WebSocketServer, WebSocket } from "ws";
import express from "express";
const app = express();
const httpServer = app.listen(8080);
const wss = new WebSocketServer({ server: httpServer });
wss.on("connection", (ws) => {
    ws.send("connected backend");
    ws.on("error", console.error);
    ws.on("message", (data) => {
        ws.send(data + " hi i am shey");
    });
});
//# sourceMappingURL=index.js.map