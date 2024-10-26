import http from "http";
import app from "./app";
import listen from "./socketServer";
import { Server } from "socket.io";
import envVariables from "./config/index";
const httpServer = http.createServer(app);

const { PORT } = envVariables;

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const startServer = () => {
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

  listen(io);
};

startServer();
