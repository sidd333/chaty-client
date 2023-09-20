import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "./chat/SideDrawer";
import MyChat from "./chat/MyChat";
import ChatBox from "./chat/ChatBox";
import { Button } from "@material-tailwind/react";
import CreateGroupChat from "./chat/CreateGroupChat";
// import { useLocation } from "react-router-dom";

const Chat = () => {
  // const { user } = ChatState();
  const [open, setOpen] = useState(false);
  // const location = useLocation();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    console.log("chat");
  }, []);
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex justify-between ">
        <SideDrawer />
        <Button onClick={() => setOpen(!open)}>add group chat</Button>{" "}
        <CreateGroupChat open={open} setOpen={setOpen} />
      </div>

      <div className="w-full flex">
        <MyChat load={load} />
        <ChatBox />
      </div>
    </div>
  );
};

export default Chat;
