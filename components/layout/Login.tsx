"use client"
import { User } from "next-auth"
import React from "react"
import { signIn, signOut } from "next-auth/react"

const Login = ({ user }: { user?: User }) => {
  return (
    <div>
      {user ? (
        <div>
          <span>Logged in as user:{user.name}</span>
          <button onClick={() => signOut({ redirectTo: "/" })}>SignOut</button>
        </div>
      ) : (
        <button onClick={() => signIn("github")}>SignIn with Github</button>
      )}
    </div>
  )
}

export default Login
