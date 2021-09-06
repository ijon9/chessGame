const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8000 });
console.log("Web Socket server started");

// ws : single connection to the server side
wss.on("connection", ws => {
    console.log("New client connected!");

    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`);
        const str = new String(data);
        ws.send(str.toUpperCase());
    });

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
});