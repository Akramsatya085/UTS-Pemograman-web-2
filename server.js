const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

console.log("Server WebSocket berjalan di ws://localhost:8080");

server.on("connection", (socket) => {
  console.log("Client baru terhubung");

  socket.on("message", (message) => {
    console.log("Pesan diterima:", message.toString());

    // Kirim pesan ke semua client yang sedang terhubung
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    console.log("Client terputus");
  });
});