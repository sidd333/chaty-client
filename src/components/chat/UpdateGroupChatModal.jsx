import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";

const UpdateGroupChatModal = ({ open, setOpen, handleOpen }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { fetchAgain, setFetchAgain, selectedChat, setSelectedChat } =
    ChatState();

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/chat/rename`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            chatName: groupChatName,
          }),
        }
      );

      const data = await response.json();
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error.stack);
    }
  };

  const handleDelete = async (user1) => {
    if (
      selectedChat.admin._id !== loggedInUser.id &&
      user1._id !== loggedInUser.id
    ) {
      console.log("delete failed");
      //   console.log(selectedChat.admin);
      //   console.log(loggedInUser);
      //   console.log(user1);
      return;
    }

    try {
      let UID = user1._id ? user1._id : user1.id;

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/chat/removeMember`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            userId: UID,
          }),
        }
      );

      const data = await response.json();

      UID === loggedInUser.id ? setSelectedChat("") : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) { }
  };

  const handleGroup = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      console.log("already exists");
      return;
    }
    if (selectedChat.admin._id !== loggedInUser.id) {
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/chat/addMember`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          chatId: selectedChat._id,
          userId: userToAdd._id,
        }),
      }
    );

    const data = await response.json();

    setSelectedChat(data);

    setFetchAgain(!fetchAgain);
  };
  const handleSearch = async (value) => {
    setSearch(value);

    if (!search) {
      return;
    } else {
      try {
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

        setSearchResult(data);
      } catch (error) {
        console.log(error.stack);
      }
      setGroupChatName("");
    }
  };

  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="items-center justify-center">
          <Typography variant="h3" color="black" className="pr-2">
            {selectedChat.chatName}
          </Typography>
        </DialogHeader>

        <DialogBody divider>
          <Card color="transparent" shadow={false}>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  value={groupChatName}
                  label="Group Name"
                  onChange={(e) => {
                    setGroupChatName(e.target.value);
                  }}
                />
                <Input
                  size="lg"
                  label="Search Name"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </div>
              {/* render selected  */}
              <div className="flex">
                {" "}
                {setSelectedChat &&
                  selectedChat.users.map((user) => {
                    return (
                      <UserBadgeItem
                        key={user._id}
                        user={user}
                        handleFunction={() => {
                          handleDelete(user);
                        }}
                      />
                    );
                  })}
              </div>

              {/* search results */}

              {searchResult.length > 0 &&
                searchResult.slice(0, 4).map((user) => {
                  return (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => {
                        handleGroup(user);
                      }}
                    />
                  );
                })}
            </form>
          </Card>
        </DialogBody>
        <DialogFooter>
          <Button className="" onClick={() => handleDelete(loggedInUser)}>
            leave
          </Button>
          <Button className="" onClick={handleRename}>
            rename
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setOpen(!open);
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default UpdateGroupChatModal;
