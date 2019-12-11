const koa = require("koa"),
  Router = require("koa-router"),
  websockify = require("koa-websocket");

const app = websockify(koa());

const http_router = new Router();

const ws_router = new Router();

/**
 * We define a route handler for when a new connection is made.
 * The endpoint can be anything you want the client to connect to.
 * If our WebSocket server address is `ws://localhost:3000` and our route is `/`,
 * this will handle any new WebSocket connections to `ws://localhost:3000/`.
 * If our route was `/test`, the handler would fire only when
 * a connection was made to `ws://localhost:3000/test`.
 */
ws_router.get("/ws", function*(next) {
  console.log("route");
  /**
   *`this` refers to the context in the `app.ws` instance, not `app`. `app` and `app.ws` use separate middleware/contexts.
   * to access a middleware's context here, you must pass the middleware to `app.ws.use()`.
   */

  // the websocket is added to the context as `this.websocket`.
  this.websocket.on("message", function(message) {
    // print message from the client
    console.log(message);
  });

  // send a message to our client
  this.websocket.send("Hello Client!");

  // yielding `next` will pass the context (this) on to the next ws middleware
  yield next;
});

http_router.get("/", function*(next) {
  this.body = "Hello World!";
});

app.ws.use(ws_router.routes());
// app.use(http_router.routes());
app.listen(3000);
