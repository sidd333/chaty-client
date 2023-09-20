import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import {
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { getSender } from "../../config/chatLogic";

const MyChat = () => {
  const { setSelectedChat, selectedChat, chats, setChats, fetchAgain } =
    ChatState();

  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const fetchChats = async () => {
    try {
      const response = await fetch("https://chy-5cjs.onrender.com/api/chat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.log("mmy chat :" + error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    console.log("triggeredd");
  }, [fetchAgain]);

  return (
    <div
      className={`w-screen sm:w-1/4 h-screen overflow-y-scroll bg-slate-500 ${
        selectedChat ? "hidden sm:block" : ""
      }`}
    >
      {console.log(chats)}
      {console.log(loggedUser)}
      {chats.length > 0 ? (
        <List chatName="w-full">
          {chats.map((chat) => {
            return (
              <ListItem
                key={chat._id}
                onClick={() => {
                  setSelectedChat(chat);
                }}
              >
                <div>
                  <Typography variant="h4" color="blue-gray">
                    {chat.isGroupChat
                      ? chat.chatName
                      : getSender(loggedUser, chat.users)}
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="">
                    latest text
                  </Typography>
                </div>

                <ListItemSuffix>
                  <Chip
                    value="14"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyChat;
