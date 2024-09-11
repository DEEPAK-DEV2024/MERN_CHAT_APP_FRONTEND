import React from "react";
import { Dropdown } from "flowbite-react";
import { FaBell } from "react-icons/fa";
import { getSender } from "../../config/ChatLogics";
import { useChat } from "../../Context/ChatProvider";
const NotificationDropdown = () => {
  const { user, notification, setNotification, setSelectedChat } = useChat();
  return (
    <div className="relative">
      <Dropdown
        label={<FaBell className="text-xl" />}
        arrowIcon={false}
        style={{
          border: "0",
          outline: "0",
          color: "rgb(31,51,55)",
          margin: "0",
          padding: "0px",
          display: "flex",
          justifyContent: "start",
          overflow: "none",
        }}
        className="w-80 md:w-96 bg-white relative"
      >
        <div className="bg-white text-lg p-1">
          {!notification.length && (
            <p className="border-b-[1px] border-gray-100">No New Message</p>
          )}
          {notification.map((notif) => (
            <p
              className="border-b-[1px] p-1 border-gray-100 cursor-pointer hover:bg-slate-200 rounded-md"
              key={notif._id}
              onClick={() => {
                setSelectedChat(notif.chat);
                setNotification(notification.filter((n) => n !== notif));
              }}
            >
              {notif.chat.isGroupChat
                ? `New Message In ${notif.chat.chatName}`
                : `New Message From ${getSender(user, notif.chat.users)}`}
            </p>
          ))}
        </div>
      </Dropdown>
      <div
        className={`absolute rounded-full h-4 w-4 bg-gray-500 justify-center items-center font-semibold top-0 right-[10px] ${
          notification.length == 0 ? "hidden" : "flex"
        }`}
      >
        {notification.length}
      </div>
    </div>
  );
};

export default NotificationDropdown;
