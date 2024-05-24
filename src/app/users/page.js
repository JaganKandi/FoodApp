"use client";

import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import useProfile from "../components/UseProfile";
import Link from "next/link";
import Edit from "../components/icons/Edit";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an Admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4 grow">
                <span className="text-gray-900">{user.name || "No Name"}</span>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button bg-white" href={"/users/"+user._id}><Edit className="w-4 h-4"/></Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default UsersPage;
