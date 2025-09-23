import WebSocket, { WebSocketServer } from "ws";
import express from "express";
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
    ws.send("connected backend");
    ws.on("error", console.error);
    ws.on("message", (data) => {
        ws.send(data + " hi i am shey");
    });
});
//# sourceMappingURL=index.js.map