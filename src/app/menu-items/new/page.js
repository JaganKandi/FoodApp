"use client";

import React, { useState } from "react";
import useProfile from "../../components/UseProfile";

import toast from "react-hot-toast";
import UserTabs from "@/app/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/app/components/icons/Right";
import { redirect } from "next/navigation";
import MenuItemForm from "@/app/components/layout/MenuItemForm";

// I implemented session check, state and loading phases
// collaboration: <MenuItemFrom/> Component (UX design and icons)

function NewMenuItemPage() {
  const { loading, data } = useProfile();

  const [redirectToItems, setRedirectToItems] = useState(false);

  if (loading) {
    return "Loading....";
  }
  if (!data.admin) {
    return "Not an Admin";
  }

  async function handleFormSubmit(e, data) {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      response.ok ? resolve() : reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item...",
      success: "Item saved",
      error: "Failed to save",
    });
    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect("/menu-items");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <span>Show all menu items</span>
          <Right />
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} /> 
    </section>
  );
}

export default NewMenuItemPage;
