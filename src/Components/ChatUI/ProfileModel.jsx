import React from "react";
import { FaTimes } from "react-icons/fa";

const ProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

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
          <div className="text-end">
            <button
              type="button"
              className="text-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={onClose}
            >
              <FaTimes className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          <h1 className="text-xl font-normal text-center mb-4">{user.name}</h1>
          <div className="m-auto w-fit rounded-full overflow-hidden">
            <img src={user.pic} alt="" className="h-32 w-32" />
          </div>
          <h2 className="text-center text-lg my-4">
            Email :{" "}
            <span className="text-lg text-black font-normal">{user.email}</span>{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
