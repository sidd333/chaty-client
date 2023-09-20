import React from "react";
import { Chip } from "@material-tailwind/react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Chip
      open={true}
      value={user.name}
      onClose={handleFunction}
      className="w-3/4"
    />
  );
};

export default UserBadgeItem;
