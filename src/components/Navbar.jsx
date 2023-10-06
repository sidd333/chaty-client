import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { fetchAgain, setFetchAgain } = ChatState();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      {location.pathname !== "/chat" && (
        <Disclosure as="nav" className="bg-gray-900">
          {({ open }) => (
            <>
              <div className="mx-auto  px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex justify-start">
                        <Link
                          className="rounded-md px-3 py-2 text-sm font-medium text-white "
                          to="/login"
                        >
                          <button className="">Login</button>
                        </Link>
                        <Link
                          className="rounded-md px-3 py-2 text-sm font-medium text-white "
                          to="/signup"
                        >
                          <button className="">SignUp</button>
                        </Link>
                        <button
                          className="rounded-md px-3 py-2 text-sm font-medium text-white "
                          onClick={() => {
                            setFetchAgain(true);
                            return navigate("/chat");
                          }}
                        >
                          chat
                        </button>
                        <Link
                          className="rounded-md px-3 py-2 text-sm font-medium text-white "
                          onClick={logout}
                        >
                          <button>Logout</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <Disclosure.Panel className="sm:hidden">
                  <Link className="text-gray-400 h-6 w-6">
                    <button className="">ooooooo</button>
                  </Link>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      )}
    </>
  );
};

export default Navbar;
