import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useChat } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import { toast } from "react-toastify";
import UserListItem from "../UserAvatar/UserListItem";
import LoaderSpinner from "./LoaderSpinner";
const UpdateGroupChatModel = ({
  isOpen,
  onClose,
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat, user } = useChat();
  if (!isOpen) return null;

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        "https://mern-chat-app-backend-ofyf.onrender.com/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error("Error Occured");
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
      toast.error("Failed to load Search Result");
    }
  };
  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast.warn("User Already In The Group!");
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast.warn("Only Admin Can Add SomeOne!");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `https://mern-chat-app-backend-ofyf.onrender.com/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleRemove = async (userToAdd) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToAdd._id === user._id
    ) {
      toast.warn("Only Admin Can Remove SomeOne!");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `https://mern-chat-app-backend-ofyf.onrender.com/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );
      userToAdd._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div
      id="profile-modal"
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-lg shadow  w-full max-w-md p-2">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-xl font-normal text-center">
              {selectedChat.chatName}
            </h1>
            <button
              type="button"
              className="text-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={onClose}
            >
              <FaTimes className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          <div className="flex gap-x-1 items-center flex-wrap my-2">
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mb-3">
            <input
              type="text"
              placeholder="Chat Name"
              className=" py-1 px-2 w-full outline-none border border-gray-300 rounded-md"
              value={groupChatName}
              onChange={(e) => {
                setGroupChatName(e.target.value);
              }}
            />
            <button
              className="bg-teal-500 py-1 px-3 rounded-md ml-2"
              disabled={renameLoading}
              onClick={handleRename}
            >
              {renameLoading ? "Updating..." : "Update"}
            </button>
          </div>
          <div>
            <input
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              id="group-member eg:- jhon,jenny,..."
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Add User To Group"
            />
            {loading ? (
              <div>
                <LoaderSpinner />
              </div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}
          </div>
          <div className="mt-4 mb-2 flex justify-end">
            <button
              className="bg-red-500 py-1 px-4 rounded-md"
              onClick={() => handleRemove(user)}
            >
              Leave Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateGroupChatModel;
