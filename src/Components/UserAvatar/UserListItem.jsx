import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      className="flex items-center justify-between mt-2 py-2 px-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
      onClick={handleFunction}
    >
      <div className="h-11 w-11 rounded-full overflow-hidden">
        <img src={user.pic} alt={`${user.name}'s profile`} />
      </div>
      <div className="ml-4">
        <div>
          <h1 className="text-lg font-semibold">{user.name}</h1>
        </div>
        <div>
          <h1 className="text-sm text-gray-600">{user.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
