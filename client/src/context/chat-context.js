import { useState, createContext, useRef } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext({
  currentUser: "",
  messages: [],
  users: [],
  updateCurrentUser: (username) => {},
  joinRoom: (username, room) => {},
  sendMessage: (message, username) => {},
  listenToChatMessage: () => {},
});

const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const API_URL = "http://localhost:3001";

  const socket = useRef(io(API_URL));

  const updateCurrentUser = (username) => {
    const user = localStorage.getItem("user");

    if (!user) {
      setCurrentUser(username);
      return localStorage.setItem("user", username);
    }

    return setCurrentUser(user);
  };

  // emit join room event to the socket server
  const joinRoom = (username, room) => {
    socket?.current?.emit("joinRoom", { username, room });
  };

  socket.current.on("roomUsers", (roomData) => {
    setUsers(roomData.users);
  });

  // emit chat message event to the socket server
  const sendMessage = (message, username) => {
    socket?.current?.emit("chatMessage", { message, username });
  };

  // listen to messages event emitted from socket server
  const listenToChatMessage = () => {
    socket?.current?.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  };

  const value = {
    currentUser,
    users,
    messages,
    updateCurrentUser,
    joinRoom,
    sendMessage,
    listenToChatMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
