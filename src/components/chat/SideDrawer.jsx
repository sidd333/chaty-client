import React, { useState, useCallback } from "react"
import { Drawer, IconButton, Typography, TextField, List, CircularProgress } from "@mui/material"
import { ChatState } from "../../context/ChatProvider"
import UserListItem from "./UserListItem"
import { PlusCircleIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import debounce from "lodash/debounce"

const SideDrawer = () => {
  const { setSelectedChat, chats, setChats } = ChatState()
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setSearchResult([])
      return
    }
    try {
      setLoading(true)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth?search=${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      })
      const data = await response.json()
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      console.log(error.stack)
      setLoading(false)
    }
  }

  const debouncedSearch = useCallback(
    debounce((searchTerm) => handleSearch(searchTerm), 300),
    [],
  )

  const onChange = (e) => {
    const searchTerm = e.target.value
    setSearch(searchTerm)
    debouncedSearch(searchTerm)
  }

  const accessChat = async (userId) => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: `${userId}`,
        }),
      })
      const data = await response.json()

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

      setSelectedChat(data)
      setLoading(false)
      closeDrawer()
    } catch (error) {
      console.log("error")
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <IconButton onClick={openDrawer} className="">
        <PlusCircleIcon className="h-6 w-6 text-accent" />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={closeDrawer} className="w-80 max-w-full">
        <div className="p-4">
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h6" className="text-primary">
              Search Users
            </Typography>
            <IconButton onClick={closeDrawer} className="text-accent">
              <XMarkIcon className="h-5 w-5" />
            </IconButton>
          </div>
          <div className="relative mb-4">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search"
              value={search}
              onChange={onChange}
              InputProps={{
                startAdornment: <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />,
              }}
            />
          </div>
          {loading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <List>
              {searchResult.map((user) => (
                <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
              ))}
            </List>
          )}
        </div>
      </Drawer>
    </React.Fragment>
  )
}

export default SideDrawer

