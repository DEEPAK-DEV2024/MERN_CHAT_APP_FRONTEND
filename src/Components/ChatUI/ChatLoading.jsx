import React from "react";

const AvatarSkelton = () => {
  return (
    <div className="flex items-center justify-between mt-2 py-2 px-2 md:px-4 border border-gray-300 rounded-md">
      <div className="h-11 bg-gray-300 rounded-full dark:bg-gray-700 w-11"></div>
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

const ChatLoading = () => {
  return (
    <div
      role="status"
      className="w-full md:max-w-md rounded shadow animate-pulse mt-1 overflow-hidden"
    >
      <AvatarSkelton />
      <AvatarSkelton />
      <AvatarSkelton />
      <AvatarSkelton />
      <AvatarSkelton />
      <AvatarSkelton />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ChatLoading;
