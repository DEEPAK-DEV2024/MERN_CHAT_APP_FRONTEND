import React, { useEffect, useState } from "react";
import { useChat } from "../../Context/ChatProvider";
import { toast } from "react-toastify";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import ChatUser from "./ChatUser";
import GroupChatModel from "./GroupChatModel";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { user, selectedChat, setSelectedChat, chats, setChats } = useChat();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://mern-chat-app-backend-ofyf.onrender.com/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast.error("Failed to load chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("User")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
      className={`
      md:w-1/4 h-[86vh] bg-white flex-col md:ml-1 md:rounded-md p-3 w-full 
      ${selectedChat ? "hidden md:flex" : "flex"}
      }
    `}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">My Chat</h1>
        <button
          onClick={openModal}
          className="py-2 px-4 bg-slate-200 rounded-md"
        >
          Add Group +
        </button>
        <GroupChatModel isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className="flex flex-col h-full w-full bg-slate-100 rounded-md overflow-y-scroll p-3 mt-2">
        {Array.isArray(chats) ? (
          chats.length > 0 ? (
            chats.map((chat) => (
              <ChatUser
                key={chat._id}
                chat={chat}
                loggedUser={loggedUser}
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                handleFunction={() => {
                  setSelectedChat(chat);
                }}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No chats available</p>
          )
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
