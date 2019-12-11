// import koa from "koa";
// import router from "koa-router";
// import websockify from "koa-websocket";

const koa = require("koa");
const router = require("koa-router");
const websockify = require("koa-websocket");

const app = websockify(koa());

const api = router();

api.get("/*", function*(next) {
  this.websocket.send("Hello World koa-router");
  this.websocket.on("message", function(message) {
    console.log(message);
  });
});

app.ws.use(api.routes()).use(api.allowedMethods());
app.listen(3000);
