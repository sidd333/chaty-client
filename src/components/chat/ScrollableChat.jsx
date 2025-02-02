"use client"

import { useState, useEffect } from "react"
import ScrollableFeed from "react-scrollable-feed"
import { isLastMessage, isSameSender } from "../../config/chatLogic"
import { Avatar } from "@mui/material"

const ScrollableChat = ({ messages }) => {
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("userInfo")))
  }, [])

  if (!loggedInUser) return null

  return (
    <ScrollableFeed className="will-change-scroll p-4">
      {messages.length > 0 &&
        messages.map((m, i) => {
          const isOwnMessage = m.sender._id === loggedInUser.id
          const showAvatar =
            isSameSender(messages, m, i, loggedInUser.id) || isLastMessage(messages, i, loggedInUser.id)

          return (
            <div key={i} className={`flex items-end mb-4 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
              <div className="w-10 flex-shrink-0">
                {showAvatar && (
                  <Avatar className="w-8 h-8" src={`/placeholder.svg?height=32&width=32`} alt={m.sender.name}>
                    {m.sender.name.charAt(0)}
                  </Avatar>
                )}
              </div>
              <div className={`flex flex-col ${isOwnMessage ? "items-end mr-3" : "items-start ml-3"} max-w-[75%]`}>
                <span className="text-xs text-gray-500 mt-1 px-1">{m.sender.name}</span>
                <span
                  className={`px-4 py-2 rounded-lg ${isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {m.content}
                </span>
              </div>
            </div>
          )
        })}
    </ScrollableFeed>
  )
}

export default ScrollableChat

