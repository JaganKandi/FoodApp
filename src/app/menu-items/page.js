"use client";

import React, { useEffect, useState } from "react";
import useProfile from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";
import Link from "next/link";
import Right from "../components/icons/Right";
import Image from "next/image";

function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return <h1 className="w-full text-center text-blue-700">Loading...</h1>;
  }

  if (!data.admin) {
    return redirect("/profile");
  }

  return (
    <section className="mt-8 ">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-xl mx-auto">
        <Link className="button" href={"/menu-items/new"}>
          <span>Create new menu Item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-3">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link
              key={item._id}
              href={'/menu-items/edit/'+item._id}
              className="bg-gray-200 rounded-lg p-4 flex flex-col items-center"
            >
              <div className="relative">
                <Image
                  className="rounded-md my-5"
                  src={item.image} alt={''} width={200} height={200} />
              </div>
              <div className="text-center font-medium">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuItemsPage;
