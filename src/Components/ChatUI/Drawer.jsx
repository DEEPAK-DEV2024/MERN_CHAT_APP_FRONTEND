import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import ChatLoading from "./ChatLoading";
import { useChat } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import LoaderSpinner from "./LoaderSpinner";

const Drawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  search,
  setSearch,
  setSearchResult,
  searchResult,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats } = useChat();
  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Enter Something In Search");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://mern-chat-app-backend-ofyf.onrender.com/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed To Load The Search Results");
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "https://mern-chat-app-backend-ofyf.onrender.com/api/chat",
        { userId },
        config
      );
      if (Array.isArray(chats)) {
        if (!chats.find((c) => c._id === data._id)) {
          setChats([data, ...chats]);
        }
      } else {
        setChats([data]);
      }
      setSelectedChat(data);
      setIsDrawerOpen(false);
      setLoadingChat(false);
    } catch (error) {
      toast.error("Error Fetching Chat");
      setLoadingChat(false);
    }
  };

  return (
    <div
      className={`h-[100vh] absolute top-0 z-50 w-full md:w-80 px-4 py-6 bg-white transition-transform duration-300 ${
        isDrawerOpen ? "left-0" : "-left-[100vw]"
      }`}
    >
      <div className="flex justify-between items-center h-6 ">
        <h1 className="text-2xl">Search Users</h1>
        <FaTimes
          className="w-5 h-5 cursor-pointer"
          aria-hidden="true"
          onClick={() => setIsDrawerOpen(false)}
        />
      </div>

      <div className="flex justify-between items-center mt-5 space-x-2">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500"
          placeholder="Search User"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleSearch}
        >
          Go
        </button>
      </div>
      <div>
        {loading ? (
          <ChatLoading />
        ) : (
          searchResult.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => {
                accessChat(user._id);
              }}
            />
          ))
        )}
        {loadingChat && (
          <LoaderSpinner color="info" aria-label="Info spinner example" />
        )}
      </div>
    </div>
  );
};

export default Drawer;
