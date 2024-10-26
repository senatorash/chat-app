import { useContext, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ChatContext } from "../../context/chat-context";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const room = searchParams.get("room");

  const chatCtx = useContext(ChatContext);

  const messageRef = useRef();

  useEffect(() => {
    chatCtx.listenToChatMessage();
    chatCtx.updateCurrentUser();
  }, []);

  useEffect(() => {
    if (chatCtx.currentUser && room) {
      chatCtx.joinRoom(chatCtx.currentUser, room);
    }
  }, [room, chatCtx.currentUser]);

  // send message handler function
  const sendMessageHandler = (event) => {
    event.preventDefault();

    const message = messageRef.current.value;

    if (!message) return;

    chatCtx.sendMessage(message, chatCtx.currentUser);

    chatCtx.listenToChatMessage();

    return (messageRef.current.value = "");
  };

  return (
    <section className="container-fluid">
      <div className="row">
        <h1>Chat Room</h1>

        <div className="col-md-4">
          {chatCtx.users.map((user) => {
            return <p>{user.username}</p>;
          })}
        </div>
        <div className="col-md-8">
          <div>
            {chatCtx.messages.map((message) => {
              return (
                <p>
                  {message.sender}-{message.message}
                </p>
              );
            })}
          </div>
          <div>
            <form onSubmit={sendMessageHandler}>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Enter Message"
                  ref={messageRef}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
