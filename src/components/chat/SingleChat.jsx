"use client"

import { useEffect, useState } from "react"
import { ChatState } from "../../context/ChatProvider"
import { Input, Button, IconButton } from "@material-tailwind/react"
import ScrollableChat from "./ScrollableChat"
import io from "socket.io-client"
import EmojiPicker from "emoji-picker-react"
import { FaceSmileIcon } from "@heroicons/react/24/outline"

const ENDPOINT = process.env.REACT_APP_BACKEND_URL // Backend URL from .env file
let socket

const SingleChat = () => {
  const { selectedChat, setTyping } = ChatState()

  // Fetch logged-in user from localStorage
  const [loggedInUser] = useState(JSON.parse(localStorage.getItem("userInfo")))

  const [socketConnected, setSocketConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // Function to handle input change and emit "typing" event
  const onChange = ({ target }) => {
    setNewMessage(target.value)

    if (selectedChat?._id) {
      socket.emit("typing", selectedChat._id, loggedInUser?.userName)
    }
  }

  // Function to handle emoji selection
  const onEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji)
    setShowEmojiPicker(false)
  }

  // Initialize Socket.io connection
  useEffect(() => {
    socket = io(ENDPOINT) // Connect to backend WebSocket server
    socket.emit("setup", loggedInUser) // Send user data to server

    socket.on("connected", () => {
      setSocketConnected(true)
    })

    return () => {
      socket.disconnect() // Cleanup on component unmount
    }
  }, [loggedInUser])

  // Fetch messages for selected chat
  const fetchMessages = async () => {
    if (!selectedChat) return

    try {
      const response = await fetch(`${ENDPOINT}/api/message/${selectedChat._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      })

      const data = await response.json()
      setMessages(data)

      socket.emit("join chat", selectedChat._id) // Notify server that user joined the chat room
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  // Send a new message
  const sendMessage = async (e) => {
    if ((e.key === "Enter" || e.target.name === "send") && newMessage) {
      try {
        const response = await fetch(`${ENDPOINT}/api/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            content: newMessage,
            chatId: selectedChat._id,
          }),
        })

        const data = await response.json()
        socket.emit("new message", data) // Emit message to other users
        setMessages([...messages, data]) // Update local state

        setNewMessage("") // Clear input field
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  // Listen for incoming messages
  useEffect(() => {
    fetchMessages() // Fetch messages when chat is selected
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        // Handle notification logic if required
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived])
      }
    })

    return () => {
      socket.off("message received") // Cleanup on unmount
    }
  }, [selectedChat, fetchMessages]) // Added fetchMessages to dependencies

  // Handle new incoming messages
  //This useEffect is now redundant because of the above changes.
  // useEffect(() => {
  //   const messageListener = (newMessageReceived) => {
  //     if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
  //       // Handle notification logic if required
  //     } else {
  //       setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
  //     }
  //   };

  //   socket.on("message received", messageListener);

  //   return () => {
  //     socket.off("message received", messageListener);
  //   };
  // }, [selectedChat]);

  // Listen for "typing" event from server
  useEffect(() => {
    const handleTyping = (message) => {
      setTyping(message)
      setTimeout(() => setTyping(""), 2000) // Reset typing indicator after 2s
    }

    socket.on("typing", handleTyping)

    return () => {
      socket.off("typing", handleTyping) // Cleanup on unmount
    }
  }, [])

  return (
    <>
      {!selectedChat ? (
        <div className="w-full flex items-center justify-center text-gray-800 text-4xl">
          Click on a user to start chatting
        </div>
      ) : (
        <div className="mt-10 h-[88vh] w-full mr-10">
          {/* Chat Messages */}
          <div className="h-[77vh]">
            <ScrollableChat messages={messages} />
          </div>

          {/* Chat Input Field */}
          <div className="absolute bottom-20 w-full">
            <div className="flex w-3/4 mx-auto relative">
              <Input
                type="text"
                label="Type a message..."
                value={newMessage}
                onChange={onChange}
                onKeyDown={sendMessage}
                className=""
              />
              <IconButton
                size="sm"
                color="gray"
                className="self-center"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FaceSmileIcon className="w-4 h-full" />
              </IconButton>
              <Button
                size="sm"
                color={newMessage ? "gray" : "blue-gray"}
                disabled={!newMessage}
                className="rounded"
                onClick={sendMessage}
                name="send"
              >
                Send
              </Button>
            </div>
            {showEmojiPicker && (
              <div className="absolute bottom-16 right-1/4">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default SingleChat

