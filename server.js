const http = require("http");
const ws = require("ws");

const wss = new ws.Server({ port: 8080 });

let LOCK_MSG = "click lock";

wss.on("connection", function connection(ws) {
  let name = ws.send(`Hello from server!`);

  ws.on("message", function incoming(message) {
    ws.send(`got message: ${message}`);
    // setTimeout(() => ws.close(1000, "Bye!"), 5000);

    if (message == LOCK_MSG) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
          client.send(message);
        }
      });
    }
  });
});
