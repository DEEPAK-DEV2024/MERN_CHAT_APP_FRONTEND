import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isSameSender,
  isLastMessage,
  isSameUser,
  isSameSenderMargin,
} from "../../config/ChatLogics";
import { useChat } from "../../Context/ChatProvider";
import Lottie from "react-lottie";
import animationData from "../../animation/typing.json";

const ScrollableChat = ({ messages, isTyping }) => {
  const { user } = useChat();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xTopYLeft slice",
    },
  };
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div key={m._id} className="flex w-full">
            <div className={`flex items-center gap-3 w-full`}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <div
                  className="h-9 w-9 md:h-10 md:w-10 cursor-pointer"
                  data-tooltip-id="profile-tooltip"
                  data-tooltip-content={m.sender.name}
                  data-tooltip-place="bottom-end"
                >
                  <img
                    src={m.sender.pic}
                    alt={"P"}
                    className="w-full h-full rounded-full"
                  />
                </div>
              )}

              <span
                className={`p-1 px-3 rounded-md max-w-52 md:max-w-96 `}
                style={{
                  backgroundColor:
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                  wordWrap: "break-word",
                  marginTop: isSameUser(messages, m, i) ? 3 : 10,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                }}
              >
                {m.content}
              </span>
            </div>
          </div>
        ))}
      {isTyping && (
        <>
          <span
            className={`flex p-1 px-3 rounded-md  mt-[3px] bg-[#B9F5D0] ml-[51px] h-9 cursor-default w-fit`}
          >
            <Lottie options={defaultOptions} />
          </span>
        </>
      )}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
