import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "David Tennant",
      image:
        "https://metro.co.uk/wp-content/uploads/2019/05/SEI64897016-b0d5.jpg?quality=90&strip=all",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
