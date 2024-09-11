import { useState } from "react";
import ChatBox from "../Components/ChatUI/ChatBox";
import MyChats from "../Components/ChatUI/MyChats";
import Navbar from "../Components/ChatUI/Navbar";
import { useChat } from "../Context/ChatProvider";

const ChatPage = () => {
  const { user } = useChat();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div className="w-full justify-between h-[91.5vh] rounded-md md:rounded-none">
      {user && <Navbar />}
      <div className="flex gap-2 mt-16 md:px-2 py-4 w-full">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
