"use client";

import useProfile from "@/app/components/UseProfile";
import UserFrom from "@/app/components/layout/UserFrom";
import UserTabs from "@/app/components/layout/UserTabs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

function EditUserPage() {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [redi, setRedirect] = useState(false);

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        const user = users.find((u) => u._id === id);
        setUser(user);
      });
    });
  }, []);

  async function handleSave(e, data) {
    e.preventDefault();

    const promise = new Promise(async (reslove, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (response.ok) {
        reslove();
setRedirect(true)
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Updating user....",
      success: "Updated",
      error: "Error",
    });
  }

  if(redi){
    return redirect('/users');
  }

  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an Admin";
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserFrom user={user} onSave={handleSave} />
      </div>
    </section>
  );
}

export default EditUserPage;
