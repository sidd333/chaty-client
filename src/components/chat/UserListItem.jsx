import React from "react";
import { Avatar } from "@mui/material";
import { UserIcon } from "@heroicons/react/24/solid";



const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      className="flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-secondary"
      onClick={handleFunction}
    >
      <Avatar className="h-10 w-10 mr-3 bg-primary text-primary-foreground">
        {user.pic ? (
          <img src={user.pic || "/placeholder.svg"} alt={user.name} className="object-cover" />
        ) : (
          <UserIcon className="h-6 w-6" />
        )}
      </Avatar>
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-primary">{user.name}</h3>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
};

export default UserListItem;
