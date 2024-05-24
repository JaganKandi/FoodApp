"use client";

import React, { lazy, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { resolve } from "path";
import CustomInput from "@/app/components/layout/CustomInput";
import Link from "next/link";
import UserTabs from "@/app/components/layout/UserTabs"
import EditableImage from "@/app/components/layout/EditableImage"
import UserForm from '../components/layout/UserFrom'


// I implemented status of session, redirects, state and loading phases
// collaboration: Page layout and <UserFrom/> handling

function ProfilePage() {
  const session = useSession();
  const { status } = session;

  const [user, setUser] = useState(null)

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  
  // const [saved, setSaved] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);

  // const [isUploading, setIsUploading] = useState(false)
  
  const [isAdmin, setIsAdmin] = useState(false)

  const[profileFetched, setProfileFetched] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      
      fetch('api/profile').then(response =>{
        const userData = response.json().then(data =>{
          setUser(data)
          setIsAdmin(data.admin)
          setProfileFetched(true)
        });
      })
    }
  }, [status, session]);

  if (status === "loading" || !profileFetched) {
    return <h1 className="w-full text-center text-blue-700">Loading...</h1>;
  }
 

  //const userImage = session.data.user.image;

  async function handleProfileInfoUpdate(ev,data) {
    ev.preventDefault();
    // setSaved(false);
    //setIsSaving(true);

    // const fd = new FormData(ev.target);
    // const data = Object.fromEntries(fd.entries());
    // //console.log(data);
    // data.image = image;

  

    const loadingToast = toast.loading("Saving...");
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    //setIsSaving(false);
    if (response.ok) {
      //setSaved(true);
      toast.dismiss(loadingToast);
      toast.success("Profile Saved");
    } else {
      toast.error("Error");
    }
  }

  

  return (
    <section className="mt-8">

    <UserTabs isAdmin={isAdmin}/>


      <div className="max-w-xl mx-auto mt-10">
        <UserForm user={user} onSave= {handleProfileInfoUpdate}/>
      </div>
    </section>
  );
}

export default ProfilePage;
