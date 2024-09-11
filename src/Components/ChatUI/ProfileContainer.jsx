import React, { useState } from "react";
import { Dropdown } from "flowbite-react";
import { FaBell } from "react-icons/fa";
import { useChat } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModel";
import { useNavigate } from "react-router-dom";

import NotificationDropdown from "./NotificationDropdown";
const ProfileContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useChat();
  const inputString = user.name;
  const capitalLetters = inputString.match(/[A-Z]/g);
  const capitalLettersString = capitalLetters ? capitalLetters.join("") : "";
  const navigate = useNavigate();
  const handleProfileClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const signOutHandler = () => {
    localStorage.removeItem("User");
    navigate("/");
  };
  return (
    <>
      <NotificationDropdown />

      <Dropdown
        label={
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-600">
            {user.pic ===
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? (
              <span className="font-bold text-gray-300 font-sans">
                {capitalLettersString}
              </span>
            ) : (
              <img src={user.pic} />
            )}
          </div>
        }
        arrowIcon={false}
        style={{
          border: "0",
          outline: "0",
          color: "black",
          margin: "0",
          padding: "0px",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Dropdown.Item
          className="text-lg bg-gray-100 text-gray-800 border-b-2 border-gray-500"
          onClick={handleProfileClick}
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={signOutHandler}
          className="text-lg bg-gray-100 text-red-500 "
        >
          Sign out
        </Dropdown.Item>
      </Dropdown>
      <ProfileModal isOpen={isOpen} onClose={handleCloseModal} user={user} />
    </>
  );
};

export default ProfileContainer;
