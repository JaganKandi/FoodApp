"use client";

import React, { useEffect, useState } from "react";
import useProfile from "../../../components/UseProfile"

import UserTabs from "../../../components/layout/UserTabs";
import Link from "next/link";
import Right from "../../../components/icons/Right";
import MenuItemForm from "../../../components/layout/MenuItemForm"

import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";

function editMenuItemPage() {
  const {loading, data} = useProfile()

  const params = useParams()
  const[ menuItem, setMenuItem] = useState(null)

const [redirectToItems, setRedirectToItems] = useState(false)

useEffect(()=>{
    fetch('/api/menu-items').then(response => {
      response.json().then(items =>{
        const item = items.find(i => i._id === params.id);
        //console.log(item);
        // setImage(item.image)
        // setName(item.name)
        // setDescription(item.description)
        // setBasePrice(item.basePrice)
        setMenuItem(item)
      })
    })
}, [])

if(loading){ return 'Loading....'}
if(!data.admin){return "Not an Admin"}
async function handleFormSubmit(e, data){
    e.preventDefault()
    data = {...data, _id: params.id}
  console.log(data);
    const savingPromise = new Promise(async(resolve, reject)=>{
        const response = await fetch("/api/menu-items",{
        method: "PUT",
        body: JSON.stringify( data),
        headers: {"Content-Type": "application/json"},
    });
    response.ok? resolve() : reject()
    });

    await toast.promise(savingPromise, {
        loading: "Saving this tasty item...",
        success: "Item saved",
        error: "Failed to save"
    })
    setRedirectToItems(true)

    

}



async function handleDelete(){
  const promise = new Promise(async(resolve, reject)=> {
    const response = await fetch('/api/menu-items?_id='+params.id, {
      method: 'DELETE',
  });
  response.ok? resolve() : reject();
  })
  
  await toast.promise(promise, {
    loading: "Deleting...",
    success: "Deleted",
    error: "Error"
  })

  setRedirectToItems(true)

}

if(redirectToItems){
  return redirect("/menu-items") 
}

  return (
    <section className="mt-8">
    <UserTabs isAdmin={true} />
    <div className='max-w-2xl mx-auto mt-8'>
            <Link href={'/menu-items'} className='button'>
            <span>Show all menu items</span>
            <Right/>
            </Link>

    </div>
    <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} onDelete={handleDelete} />
   
  </section>
  )
}

export default editMenuItemPage;
