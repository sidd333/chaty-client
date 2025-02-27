import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ChatState } from "../context/ChatProvider"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Fade,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import { XMarkIcon, Bars3Icon as MenuIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import SideDrawer from "./chat/SideDrawer"
import CreateGroupChat from "./chat/CreateGroupChat"

const StyledAppBar = styled(AppBar)({
  background: "#161A30",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
})

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
})

const NavButton = styled(Button)({
  color: "#F0ECE5",
  margin: "8px",
  "&:hover": {
    backgroundColor: "#31304D",
  },
  transition: "background-color 0.3s",
})

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  const [groupChatOpen, setGroupChatOpen] = useState(false)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, isAuthenticated } = useAuth()
  const { setFetchAgain, typing, setTyping } = ChatState()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true)
  }

  const handleLogoutConfirm = () => {
    setLogoutConfirmOpen(false)
    logout()
    navigate("/login")
  }

  const handleLogoutCancel = () => {
    setLogoutConfirmOpen(false)
  }

  const handleChatNavigation = () => {
    setFetchAgain(true)
    navigate("/chat")
  }

  const navItems = [{ text: "Logout", onClick: handleLogoutClick }]

  if (location.pathname === "/chat") {
    return null
  }

  const drawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 240,
          background: "linear-gradient(to right, #f5f5f5, #e0e0e0)",
          color: theme.palette.text.primary,
        },
      }}
    >
      <div className="p-4">
        <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(false)} sx={{ mb: 2 }}>
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                item.onClick()
                setDrawerOpen(false)
              }}
              className="hover:bg-black hover:bg-opacity-5 transition-colors duration-300"
            >
              {item.icon && <span className="mr-2 text-accent">{item.icon}</span>}
              <ListItemText className="text-accent" primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )

  return (
    <Fade in={true} timeout={1000} className={`${!isAuthenticated && "!hidden"}`}>
      <StyledAppBar position="static" elevation={0}>
        <StyledToolbar>
          <Typography variant="h6" component="div" className="font-bold text-accent">
            Chatly
          </Typography>

          {typing && (
            <Typography variant="body2" className="text-gray-400 ">
              {typing}
            </Typography>
          )}
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
                <MenuIcon className="h-6 w-6 text-accent" />
              </IconButton>
            </>
          ) : (
            <div className="flex items-center">
              <SideDrawer open={sideDrawerOpen} setOpen={setSideDrawerOpen} />
              {navItems.map((item) => (
                <NavButton key={item.text} onClick={item.onClick}>
                  {item.icon && <span className="mr-2 text-gray-600">{item.icon}</span>}
                  <span className="text-accent">{item.text}</span>
                </NavButton>
              ))}

              <IconButton color="inherit" className="ml-2" onClick={() => setGroupChatOpen(true)}>
                <UserGroupIcon className="h-5 w-5 text-gray-600" />
              </IconButton>
            </div>
          )}
        </StyledToolbar>
        {drawer}
        <CreateGroupChat open={groupChatOpen} setOpen={setGroupChatOpen} />

        <Dialog
          open={logoutConfirmOpen}
          onClose={handleLogoutCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure you want to log out?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogoutCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </StyledAppBar>
    </Fade>
  )
}

export default Navbar

