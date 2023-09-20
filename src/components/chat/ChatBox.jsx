import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "./SingleChat";
// import { getSender } from "../../config/chatLogic";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { Button } from "@material-tailwind/react";

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const handleOpen = () => setOpen(!open);
  return (
    <div
      className={`w-full sm:w-3/4  bg-gray-300 relative ${
        selectedChat ? "flex " : "hidden md:flex"
      }`}
    >
      <div>
        <button
          className="block sm:hidden bg-red-600 rounded"
          onClick={() => setSelectedChat("")}
        >
          back
        </button>
      </div>{" "}
      {/* <div>
        {console.log(selectedChat)}
        {selectedChat && !selectedChat.isGroupChat ? (
          <>{getSender(loggedUser, selectedChat.users)}</>
        ) : (
          <> {selectedChat && selectedChat.chatName.toUpperCase()}</>
        )}
      </div> */}
      {selectedChat && selectedChat.isGroupChat ? (
        <div className="absolute right-0 top-0">
          <Button onClick={handleOpen} variant="filled" color="cyan">
            UPDATE GROUP
          </Button>
          <UpdateGroupChatModal
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
          />
        </div>
      ) : (
        <></>
      )}
      <SingleChat />
    </div>
  );
};

export default ChatBox;
