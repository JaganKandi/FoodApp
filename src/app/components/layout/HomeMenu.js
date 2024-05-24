'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import Link from "next/link";
import Right from "../icons/Right";

function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([])


  useEffect(()=>{
    
    fetch('/api/menu-items').then(response => {
      response.json().then(menuItems =>{
        
        const bestSellers = menuItems.slice(0,2) // array of objects
        bestSellers.push(menuItems.slice(-1)[0]);
        setBestSellers(bestSellers);
      })
    })
  }, [])
  return (
    <section className="mt-8">
      <div className="absolute left-0 right-0 w-full justify-start">
      <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} width={109} height={189}  alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
        </div>
      </div>

      <div className="text-center mb-4">
        <SectionHeaders subHeader={'check out'} mainHeader={'Our Best Sellers'} />
      </div>


      <div className="grid grid-cols-3 gap-4">
      {bestSellers?.length > 0 && bestSellers.map(item => (
        <MenuItem {...item}/>
      ))}
    </div>

      <div className="flex justify-center items-center mt-4">

<Link href={'/menu'} className="underline text-xl text-gray-500"> <Right className="inline mr-2 w-6 h-6 text-primary"/>Checkout full menu</Link> 
      </div>
    
        
    </section>
  );
}

export default HomeMenu;
