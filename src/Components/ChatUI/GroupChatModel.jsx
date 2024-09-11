import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useChat } from "../../Context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModel = ({ isOpen, onClose }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = useChat();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
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
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.warn("User Already Added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.warn("Please fill all the fields");
      return;
    }
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `https://mern-chat-app-backend-ofyf.onrender.com/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast.success("New Group Chat Created");
    } catch (error) {
      toast.error("Failed To Create The Chat!");
    }
  };
  if (!isOpen) return null;
  return (
    <div
      id="group-chat-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-4 rounded-md shadow-lg w-72 md:w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-lg font-semibold">
            Create Group Chat
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-slate-200 rounded-md"
          >
            <FaTimes className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mb-4">
          <input
            onChange={(e) => setGroupChatName(e.target.value)}
            type="text"
            id="group-name"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter group name"
          />
        </div>
        <div className="mb-4">
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            id="group-member eg:- jhon,jenny,..."
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter group member name"
          />
          <div className="flex gap-x-1 items-center flex-wrap my-2">
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={user._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </div>
          {loading ? (
            <div>Loading</div>
          ) : (
            searchResult
              ?.slice(0, 4)
              .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
          )}
          <button
            onClick={handleSubmit}
            className="mt-4 py-2 px-4 bg-slate-200 rounded-md"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModel;
