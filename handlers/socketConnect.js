const onlineUsers = new Map();
const adminSockets = [];

const socketHandler = (socket) => {
  socket.on("admin-connect", () => {
    adminSockets.push(socket.id);
  });

  socket.on("user-connect", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} connected`);
  });

  socket.on("create-order", () => {
    adminSockets.forEach((adminSocketId) => {
      socket.to(adminSocketId).emit("new-order");
    });
  });
  socket.on("access-order", () => {
    adminSockets.forEach((adminSocketId) => {
      socket.to(adminSocketId).emit("access-order");
    });
  });
  socket.on("refuse-order", () => {
    adminSockets.forEach((adminSocketId) => {
      socket.to(adminSocketId).emit("refuse-order");
    });
  });

  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) socket.emit("message-recieve", data);
  });

  socket.on("disconnect", () => {
    const index = adminSockets.indexOf(socket.id);
    if (index !== -1) {
      adminSockets.splice(index, 1);
    }
  });
};

module.exports = { socketHandler };
