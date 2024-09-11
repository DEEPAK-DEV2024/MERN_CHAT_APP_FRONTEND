import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useChat } from "../../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useChat();
  return (
    <div
      className={`md:w-3/4 w-full h-[86vh] bg-white md:rounded-md p-3
        ${
          selectedChat ? "flex" : "hidden md:flex"
        } flex-col justify-between w-full`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
