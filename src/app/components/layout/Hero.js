'use client'

import React from "react";
import Image from "next/image";
import Right from "../icons/Right";
import {motion} from 'framer-motion'


// I implemented left hero part
// collaboration: image spinning using framer-motion

function Hero() {
  return (
    <>
      <section className="hero mt-4">
        <div className="py-12">
          <h1 className="text-4xl font-semibold">
            Everything <br/> is better <br /> with a <span className="text-primary">Pizza</span>
          </h1>
          <p className="my-6 text-gray-500">
            Pizza is the missing piece that makes every day complete, a simple
            yet delicious joy in life
          </p>
          <div className="flex gap-4 text-sm">
            <button className="bg-primary uppercase flex justify-center items-center gap-2 text-white px-4 py-2 rounded-full">Order now <Right /></button>
            <button className="flex justify-center items-center gap-2 py-2 text-gray-600 font-semibold">Learn More <Right /></button>
          </div>
        </div>
        
       

        <motion.div className="relative"  animate={{ rotate: 360 }}
        initial={{ rotate: 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear"  }}>
          <Image 
            src={"/pizza_1.png"}
            layout={"fill"}
            objectFit="contain"
            alt=""
          />
        </motion.div>
      </section>
    </>
  );
}

export default Hero;
