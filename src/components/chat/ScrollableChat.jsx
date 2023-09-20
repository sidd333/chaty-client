import React, { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../config/chatLogic";

const ScrollableChat = ({ messages }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  return (
    <ScrollableFeed className="will-change-scroll">
      {console.log(messages)}
      {messages.length > 0 &&
        messages.map((m, i) => {
          return (
            <div
              key={i}
              className={`flex mx-2 ${
                m.sender._id === loggedInUser.id && "flex-row-reverse"
              }`}
            >
              {isSameSender(messages, m, i, loggedInUser.id) ||
              isLastMessage(messages, i, loggedInUser.id) ? (
                <div className="w-4 sm:w-12">
                  <p>{m.sender.name} : </p>
                </div>
              ) : (
                <div className="w-4 sm:w-12"></div>
              )}

              <span
                className={`${
                  m.sender._id === loggedInUser.id && "bg-light-green-300"
                } bg-cyan-600 rounded-lg p-4 float-right max-w-[75%]`}
              >
                {m.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
