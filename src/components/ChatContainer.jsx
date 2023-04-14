import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/auth_context";
import { addmsgRoute, getmsgRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

function ChatContainer({ currentChat, socket }) {
  const { user, setUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post(getmsgRoute, {
        from: user._id,
        to: currentChat._id,
      });

      setMessages(res.data);
    };
    fetch();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    console.log(msg);
   

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      msg,
    });
    await axios.post(addmsgRoute, {
        from: user._id,
        to: currentChat._id,
        message: msg,
      });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="text-white flex flex-col">
      <div className="chat-header flex justify-between items-center px-5 py-4">
        <div className="user-details flex gap-x-5 items-center">
          <div className="avatar">
            <img
              className="h-10 w-10 rounded-full"
              src={currentChat?.avatarImage}
              alt=""
            />
          </div>
          <div className="username">
            <h3 className="text-xl font-thin">{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages overflow-y-auto flex flex-col px-5 w-full h-[65vh]">
        {messages.map((message, index) => {
          return (
            <div ref={scrollRef} key={index} className="my-3">
              <div
                className={`flex items-center ${
                  message.fromSelf ? "justify-end" : "justify-start"
                }`}
              >
                <div className="content  rounded-lg bg-blue-300 px-3 py-1">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

export default ChatContainer;
