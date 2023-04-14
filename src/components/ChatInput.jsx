import React, { useState } from "react";

// import { Picker } from 'emoji-mart'
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    // let message = msg;
    // message += emojiObject.emoji;
    // setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <div className="px-5 flex">
      <div className="p-5">
        <div className="emoji text-2xl text-orange-400 relative">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
         
        </div>
      </div>
      <form
        className="input-container w-full flex  border border-violet-600 rounded-3xl"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          className="py-5 px-4 focus:outline-none border-none bg-transparent text-white w-full"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button
          type="submit"
          className="px-2 text-white  text-xl"
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
