"use client";

import {signIn} from "next-auth/react";

import React, { useState } from "react";
import Link from "next/link";

import Image from "next/image";


// I implemented state, manual credentials login and next.js credentials providers
// collaboration: Google OAuth and it's providers

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    response.ok ? setUserCreated(true) : setError(true);
    setCreatingUser(false);
  }

  return (
    <section className="mt-4">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="text-center my-4">
          User created. <br /> Now you can{" "}
          <Link className="underline text-blue-800" href="/login">
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="text-center my-4 text-red-500">
          An error occurred. Try again!
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div  className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button onClick={ () => signIn("google", {callbackUrl: "/"})} type="button" className="flex justify-center gap-4 text-gray-500">
          <Image src={"/google.png"} width={24} height={24} alt="" />
          Login with Google
        </button>
        <div className="text-center my-4 border-t pt-4">
          Existing account?{" "}
          <Link className="underline text-blue-700" href="/login">
            Login here
          </Link>
        </div>
      </form>
    </section>
  );
}

export default RegisterPage;
