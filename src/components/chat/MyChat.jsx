import { useEffect, useState } from "react"
import { ChatState } from "../../context/ChatProvider"
import { List, ListItem, ListItemAvatar, ListItemText, Typography, Chip } from "@mui/material"
import { UserGroupIcon } from "@heroicons/react/24/outline"
import { getSender } from "../../config/chatLogic"
import { Avatar } from "@mui/material"

const MyChat = () => {
  const { setSelectedChat, selectedChat, chats, setChats, fetchAgain } = ChatState()

  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("userInfo")))

  const fetchChats = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      })

      const data = await response.json()
      setChats(data)
    } catch (error) {
      console.log("mmy chat :" + error)
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
    console.log("triggeredd")
  }, [fetchAgain, localStorage.getItem("userInfo")]) // Added localStorage.getItem("userInfo") to dependencies

  return (
    <div className={`w-screen sm:w-1/4 h-screen overflow-y-scroll bg-secondary bg-opacity-50 ${selectedChat ? "hidden sm:block" : ""}`}>
      {chats?.length > 0 ? (
        <List className="w-full">
          {chats?.map((chat) => (
            <ListItem
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className="hover:bg-secondary cursor-pointer transition-colors duration-200 hover:text-accent"
            >
              <ListItemAvatar>
                <Avatar className="bg-accent text-accent-foreground">
                  {chat.isGroupChat ? (
                    <UserGroupIcon className="h-6 w-6" />
                  ) : (
                    getSender(loggedUser, chat.users).charAt(0).toUpperCase()
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" className="text-primary-foreground font-semibold">
                    {chat.isGroupChat ? chat.chatName : getSender(loggedUser, chat.users)}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" className=" ">
                    {chat.latestMessage?.content || "Say hi to your friend"}
                  </Typography>
                }
              />
              {/* <Chip
                label="14"
                variant="outlined"
                size="small"
                className="bg-accent text-accent-foreground rounded-full"
              /> */}
            </ListItem>
          ))}
        </List>
      ) : (
        <></>
      )}
    </div>
  )
}

export default MyChat

