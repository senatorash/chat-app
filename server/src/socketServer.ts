import { Server } from "socket.io";
import {
  userJoin,
  getCurrentUser,
  getRoomUsers,
} from "./helpers/socketHelpers";
import MessageFormat from "./helpers/messageForm";

const admin = "Leo";

const listen = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", (userData) => {
      const user = userJoin(socket.id, userData.username, userData.room);

      socket.join(user.room);

      // send a welcoming message to the user that joins the room
      socket.emit(
        "message",
        new MessageFormat(admin, `Welcome to ${user.room} room`)
      );

      // send a user join room notification to other users in the room
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          new MessageFormat(admin, `${user.username} has joined the room`)
        );

      // emit room users to all the users in a particular room
      io.to(user.room).emit("roomUsers", { users: getRoomUsers(user.room) });
    });

    socket.on("chatMessage", (messageData) => {
      console.log(messageData);
      // check if message sender is actively connected to the socket server
      const user = getCurrentUser(messageData.username);

      console.log(user);

      // emit chat message to all users in the room
      if (user) {
        io.to(user.room).emit(
          "message",
          new MessageFormat(user.username, messageData.message)
        );
      }
    });
  });
};

export default listen;
