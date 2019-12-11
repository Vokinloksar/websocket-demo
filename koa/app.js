var koa = require("koa");

var Router = require("koa-router"),
  websockify = require("koa-websocket");

// var index = require("./routes/index");
// var users = require("./routes/users");

// websocket
var app = websockify(koa());
let ws_router = new Router();
let http_router = new Router();
// ws_router.get("/websocket", function*(next) {
//   /**
//    *`this` refers to the context in the `app.ws` instance, not `app`. `app` and `app.ws` use separate middleware/contexts.
//    * to access a middleware's context here, you must pass the middleware to `app.ws.use()`.
//    */

//   // the websocket is added to the context as `this.websocket`.
//   this.websocket.on("message", function(message) {
//     // print message from the client
//     console.log(message);
//   });

//   // send a message to our client
//   this.websocket.send("Hello Client!");

//   // yielding `next` will pass the context (this) on to the next ws middleware
//   yield next;
// });

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
// http_router.get("/test", function*(next) {
//   this.body = "Hello World!";
// });
// app.use(require("koa-static")(__dirname + "/public"));
app.ws.use(ws_router.routes());
// app.use(http_router.routes());
// error handler
// onerror(app);

// global middlewares
// app.use(
//   views("views", {
//     root: __dirname + "/views",
//     default: "jade"
//   })
// );
// app.use(require("koa-bodyparser")());
// app.use(json());
// app.use(logger());

// app.use(function*(next) {
//   var start = new Date();
//   yield next;
//   var ms = new Date() - start;
//   console.log("%s %s - %s", this.method, this.url, ms);
// });

// routes definition
// app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

// error-handling
// app.on("error", (err, ctx) => {
//   console.error("server error", err, ctx);
// });
app.listen(3000);
// don't use `npm start for ws`, app.js is set as a http-only server in bin/www
module.exports = app;
