import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { useAuth } from "../context/auth_context";
import { getAllRoute, host } from "../utils/APIRoutes";
import {io} from 'socket.io-client';
function Chats(props) {
  const navigate = useNavigate();
  const socket = useRef();
  const { user, setUser } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (Object.keys(user).length != 0) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user._id]);
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/login");
    } else {
      fetch();
    }
  }, [user]);
  const fetch = async () => {
    if (user.isAvatarImageSet) {
      console.log("fet");
      const data = await axios.get(`${getAllRoute}/${user._id}`);

      setContacts(data.data);
    } else {
      navigate("/setAvatar");
    }
  };

  const handleChatChange = (chat) => {
    console.log(chat);
    setCurrentChat(chat);
  };

  return (
    <div className="w-full h-screen bg-[#131324] flex items-center justify-center">
      <div className="w-[85vw] h-[85vh] bg-[#00000076] rounded-2xl flex">
        <div className="flex-[2] h-5 bg-white">
          <Contacts
            contacts={contacts}
            changeChat={handleChatChange}
            currentUser={currentUser}
          />
        </div>
        <div className="flex-[5]">
          {currentChat === undefined ? <Welcome /> : <ChatContainer currentChat={currentChat} socket={socket} />}
        </div>
      </div>
    </div>
  );
}

export default Chats;
