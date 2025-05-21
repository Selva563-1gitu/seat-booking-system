const { Server } = require("socket.io");

let io;

function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // You can restrict this to your frontend origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    socket.on("join", ({ restaurantId, timeSlot }) => {
      const room = `${restaurantId}-${timeSlot}`;
      socket.join(room);
      console.log(`🔔 Socket ${socket.id} joined room ${room}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
}

function notifySeatChange(restaurantId, timeSlot, updatedBookedSeats) {
  const room = `${restaurantId}-${timeSlot}`;
  if (io) {
    io.to(room).emit("seat-updated", updatedBookedSeats);
    console.log(`📢 Notified room ${room} with updated seats.`);
  }
}

module.exports = { setupSocket, notifySeatChange };
