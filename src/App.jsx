import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className="h-[100vh] bg-[url('background.jpg')] bg-cover bg-no-repeat bg-center overflow-hidden">
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chats" element={<ChatPage />} />
          </Routes>
        </ChatProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
