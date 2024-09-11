import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { getSender, getSenderObj } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModel";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
import { useChat } from "../../Context/ChatProvider";
import LoaderSpinner from "./LoaderSpinner";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
const ENDPOINT = "https://mern-chat-app-backend-ofyf.onrender.com";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupChatModalOpen, setIsGroupChatModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    useChat();
  const handleProfileClick = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleGroupClick = () => {
    setIsGroupChatModalOpen(true);
  };

  const handleGroupClose = () => {
    setIsGroupChatModalOpen(false);
  };

  const typeingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const sendMessage = async () => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://mern-chat-app-backend-ofyf.onrender.com/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Failed To Send The Message");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
      socket.emit("stop typing", selectedChat._id);
    }
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `https://mern-chat-app-backend-ofyf.onrender.com/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Failed To Load The Message");
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("message received", (newMessageReceived) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newMessageReceived.chat._id
        ) {
          if (!notification.includes(newMessageReceived)) {
            setNotification([newMessageReceived, ...notification]);
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        }
      });

      return () => {
        socket.off("message received");
      };
    }
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  return (
    <>
      {selectedChat ? (
        <>
          <div className="flex justify-between items-center md:px-4 mb-3">
            <button
              className="bg-slate-200 text-xl font-bold py-1 px-2 rounded-md md:hidden"
              onClick={() => setSelectedChat("")}
            >
              <IoMdArrowRoundBack />
            </button>
            {!selectedChat.isGroupChat ? (
              <>
                <h1 className="text-xl font-bold">
                  {getSender(user, selectedChat.users)}
                </h1>

                <ProfileModal
                  isOpen={isOpen}
                  onClose={handleCloseModal}
                  user={getSenderObj(user, selectedChat.users)}
                />
                <button
                  className="bg-slate-200 text-xl font-bold py-1 px-2 rounded-md"
                  onClick={() => {
                    handleProfileClick();
                  }}
                >
                  {isOpen ? <FaEyeSlash /> : <FaEye />}
                </button>
              </>
            ) : (
              <>
                <h1 className="text-xl font-bold">
                  {selectedChat.chatName.toUpperCase()}
                </h1>

                <button
                  className="bg-slate-200 text-xl font-bold py-1 px-2 rounded-md"
                  onClick={handleGroupClick}
                >
                  {isGroupChatModalOpen ? <FaEyeSlash /> : <FaEye />}
                </button>
                <UpdateGroupChatModel
                  isOpen={isGroupChatModalOpen}
                  onClose={handleGroupClose}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </div>

          <div
            className={`flex flex-col p-3 bg-[#E8E8E8] h-full w-full rounded-lg overflow-y-hidden ${
              loading
                ? "justify-center items-center"
                : "items-start justify-end"
            }`}
          >
            {loading ? (
              <LoaderSpinner />
            ) : (
              <div className="flex flex-col overflow-y-scroll w-full mb-5  h-[100%]">
                <ScrollableChat messages={messages} isTyping={isTyping} />
              </div>
            )}
            <div
              className={`w-full relative bg-[#D1D1D1] rounded-md overflow-hidden ${
                loading ? "hidden" : "block"
              }`}
            >
              <input
                type="text"
                required
                value={newMessage}
                onChange={typeingHandler}
                className="text-lg w-full py-2 px-4 font-normal bg-transparent outline-none border-none"
                placeholder="Type your message..."
                onKeyDown={handleKeyPress}
              />
              <button
                className="absolute z-30 right-0 py-2 w-9 h-9 rounded-full  transition duration-200"
                onClick={sendMessage}
              >
                <IoSendSharp className="text-black hover:text-gray-900 text-2xl" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full ">
          <h1 className=" text-3xl text-gray-500 font-medium ">
            Click On User To Start Chatting
          </h1>
        </div>
      )}
    </>
  );
};

export default SingleChat;
