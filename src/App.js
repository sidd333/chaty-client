import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { NoteProvider } from "./context/NoteProvider";
import { ChatProvider } from "./context/ChatProvider";

import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Chat from "./components/Chat";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Auth context

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <AuthProvider>
      <NoteProvider>
        <ChatProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectedRoute component={Chat} />} />
            {/* <Route path="/chat" element={<ProtectedRoute component={Chat} />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ChatProvider>
      </NoteProvider>
    </AuthProvider>
  );
}

// ProtectedRoute component to guard access
function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth(); // Access auth state
  console.log(isAuthenticated, "isAuthenticated")
  if (!isAuthenticated) {
    return <Login />; // Redirect to login page if not authenticated
  }

  return <Component {...rest} />;
}
