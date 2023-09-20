import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      className="bg-blue-600 text-white rounded p-2 m-2 hover:cursor-pointer "
      onClick={handleFunction}
    >
      <p>{user.name} </p>
    </div>
  );
};

export default UserListItem;
