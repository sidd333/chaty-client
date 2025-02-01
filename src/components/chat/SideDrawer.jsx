import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { ChatState } from "../../context/ChatProvider";
import UserListItem from "./UserListItem";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const SideDrawer = () => {
  const { setSelectedChat, chats, setChats } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState();

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const onChange = ({ target }) => setSearch(target.value);

  const handleSearch = async () => {
    if (!search) {
      console.log("empty");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth?search=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error.stack);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: `${userId}`,
        }),
      });
      const data = await response.json();

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <React.Fragment>
      <IconButton variant="gradient" onClick={openDrawer}><PlusCircleIcon className="h-6 w-8" /></IconButton>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Search
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="relative flex w-full max-w-[24rem]">
          <Input
            type="text"
            label="Search"
            value={search}
            onChange={onChange}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={search ? "gray" : "blue-gray"}
            disabled={!search}
            className="!absolute right-1 top-1 rounded"
            onClick={handleSearch}
          >
            Invite
          </Button>
        </div>
        {loading ? (
          <></>
        ) : (
          searchResult.length > 0 &&
          searchResult.map((user) => {
            return (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            );
          })
        )}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
