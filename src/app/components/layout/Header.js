"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";

function Header() {
  const session = useSession();
  console.log(session);
  const status = session?.status;
  let userName = session.data?.user.name || session.data?.user.email;

  const { cartProducts } = useContext(CartContext);

  if (userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <>
      <div className="">
        <header className="flex items-center justify-between">
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link className="text-primary font-semibold text-2xl" href="/">
              PizZZza
            </Link>
            <Link href={"/"}>Home</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/#about"}>About</Link>
            <Link href={"/#contact"}>Contact</Link>
          </nav>
          <nav className="flex items-center gap-4 text-gray-500 font-semibold">
            {status === "authenticated" && (
              <>
                <Link href={"/profile"}>{userName}</Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="bg-primary rounded-full text-white px-8 py-2"
                >
                  Logout
                </button>
                
              </>
            )}

            {session?.status === "unauthenticated" && (
              <>
                <Link href={"/login"}>Login</Link>
                <Link
                  href={"/register"}
                  className="bg-primary rounded-full text-white px-8 py-2"
                >
                  Register
                </Link>
              </>
            )}<Link href={"/cart"} className="relative">
                  <ShoppingCart />{" "}
                  <span className="absolute -top-3 -right-3 bg-primary text-white text-xs rounded-full p-1 leading-3 ">
                    {cartProducts.length}
                  </span>
                </Link>
          </nav>
        </header>
      </div>
    </>
  );
}

export default Header;
