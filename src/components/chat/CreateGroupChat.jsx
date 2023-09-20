import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Input,
  Checkbox,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { ChatState } from "../../context/ChatProvider";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";

const CreateGroupChat = ({ open, setOpen }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { user, setChats, chats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) return;
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleSearch = async (value) => {
    setSearch(value);

    if (!search) {
      return;
    } else {
      try {
        const response = await fetch(
          `https://chy-5cjs.onrender.com/api/auth?search=${search}`,
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
    }
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  };
  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length < 2) return;
    try {
      const response = await fetch(
        `https://chy-5cjs.onrender.com/api/chat/group`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
          }),
        }
      );

      const data = await response.json();
      setChats([data, ...chats]);
      setOpen(!open);
    } catch (error) {
      console.log(error.stack);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        handler={() => {
          setOpen(!open);
        }}
      >
        <DialogHeader>Create Group</DialogHeader>
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
                {selectedUsers.map((user) => {
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
                      user={user}
                      handleFunction={() => {
                        handleGroup(user);
                      }}
                    />
                  );
                })}

              <Button className="mt-6" onClick={handleSubmit}>
                create chat
              </Button>
            </form>
          </Card>
        </DialogBody>
        <DialogFooter>
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
    </>
  );
};

export default CreateGroupChat;
