<template>
  <div id="app">
    <button @click="lock" :disabled="lockedByOthers">Lock</button>
  </div>
</template>

<script>
let socket = new WebSocket("ws://localhost:8080");

let LOCK_MSG = "click lock";

export default {
  name: "app",
  data() {
    return {
      lockedByOthers: false
    };
  },
  methods: {
    lock() {
      socket.send(LOCK_MSG);
    }
  },
  async mounted() {
    let vm = this;

    socket.onopen = function() {
      console.info("[open] Connection established");
      console.info("Sending to server");
      socket.send("a new cient joined ws");
    };

    socket.onmessage = function(event) {
      console.info(`[message] Data received from server: ${event.data}`);
      if (event.data == LOCK_MSG) {
        vm.lockedByOthers = true;
      }
    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        console.info(
          `[close] Connection closed cleanly, code=${event.code} reason=${
            event.reason
          }`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert("[close] Connection died");
      }
    };

    socket.onerror = function(error) {
      alert(`[error] ${error.message}`);
    };
  }
};
</script>

<style></style>
