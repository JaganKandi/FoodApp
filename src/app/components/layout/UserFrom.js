'use client'

import React, { useState } from 'react'

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

import CustomInput from "@/app/components/layout/CustomInput";
import Link from "next/link";
import UserTabs from "@/app/components/layout/UserTabs"
import EditableImage from "@/app/components/layout/EditableImage"
import useProfile from '../UseProfile';
import AddressInputs from "./AddressInputs"


function UserFrom({user, onSave}) {
    

    const [userName, setUserName] = useState(user?.name || "");
    const [image, setImage] = useState(user?.image || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [streetAddress, setStreetAddress] = useState(user?.street || "");
    const [postalCode, setPostalCode] = useState(user?.zip || "");
    const [city, setCity] = useState(user?.city || "");
    const [country, setCountry] = useState(user?.country || "");
    const [admin, setAdmin] = useState(user?.admin || false)
    
    const {data: loggedInUser} = useProfile()
  
  
    function handleAddress(propName, value){
        if(propName === 'city') setCity(value)
        if(propName === 'country') setCountry(value)
        if(propName === 'phone') setPhone(value)
        if(propName === 'streetAddress') setStreetAddress(value)
        if(propName === 'postalCode') setPostalCode(value)
    }


  return (
    <div className="flex gap-6">
          <div>
            <div className="p-2 relative max-w-[150px]">
              <EditableImage link={image} setLink={setImage}/>
            </div>
          </div>
          <form className="grow" onSubmit={e=>onSave(e, {name: userName, image, phone, street: streetAddress, city, zip: postalCode, country, admin})}>
              <CustomInput labelName="First & Last name" name="name" type="text" placeholder='John Wick' value={userName} onChange = {e => setUserName(e.target.value)}/>
              <CustomInput labelName="Email" name="email" type="email" disabled value={user.email} placeholder='user@example.com' />
              <AddressInputs addressProps={{phone, streetAddress, postalCode, city, country}} setAddressProps={handleAddress}/>
               {loggedInUser.admin && <div >
                    <label htmlFor='admincb' className='p-2 inline-flex items-center gap-2 mb-2 cursor-pointer'>
                    <input id='admincb' type='checkbox' value={'1'} checked={admin} onClick = {e => setAdmin(e.target.checked)} />
                     <span>Admin</span>
                     </label>
                </div>}  

            <button type="submit">Save</button>
          </form>
        </div>
  )
}

export default UserFrom