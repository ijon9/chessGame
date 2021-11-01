const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8000 });
console.log("Web Socket server started");

// ws : single connection to the server side
wss.on("connection", ws => {
    console.log("New client connected!");
    console.log("Number of clients connected: " + wss.clients.size);

    // First client has connected, they will be white
    if(wss.clients.size == 1) ws.send("white");
    // Second client has connected, they will be black
    else if(wss.clients.size == 2) ws.send("black");
    // More than two clients are connected, so don't assign the client a piece color
    else { }


    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`);
        wss.clients.forEach(function each(client) {
            if(ws != client && client.readyState === WebSocket.OPEN) client.send(`${data}`);
        });
    });

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
});