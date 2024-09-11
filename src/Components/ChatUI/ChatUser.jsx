import React from "react";
import { getSender } from "../../config/ChatLogics";

const ChatUser = ({ chat, handleFunction, bg, color, loggedUser }) => {
  return (
    <div
      style={{ backgroundColor: bg, color }}
      className={`flex items-center justify-between mt-2 py-2 px-4 rounded-md cursor-pointer`}
      onClick={handleFunction}
    >
      <h2>
        {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
      </h2>
    </div>
  );
};

export default ChatUser;
