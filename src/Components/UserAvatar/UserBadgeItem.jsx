import React from "react";
import { FaTimes } from "react-icons/fa";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div
      className="px-2 py-1 rounded-md m-1 mb-2 text-md font-normal bg-purple-500 cursor-pointer text-black flex justify-between w-fit items-center"
      onClick={handleFunction}
    >
      {user.name}

      <FaTimes className="w-4 h-4 pl-1 mx-1" aria-hidden="true" />
    </div>
  );
};

export default UserBadgeItem;
