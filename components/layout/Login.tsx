"use client"
import { User } from "next-auth"
import React from "react"
import { signIn, signOut } from "next-auth/react"

const Login = ({ user }: { user?: User }) => {
  if (!user)
    return (
      <button className="border-2 p-2 rounded" onClick={() => signIn("github")}>
        SignIn with Github
      </button>
    )

  return (
    <div>
      <div className="text-center">
        <div>Logged in as user: {user.name}</div>
        <button
          className="border-2 p-2 rounded"
          onClick={() => signOut({ redirectTo: "/" })}
        >
          SignOut
        </button>

        <p className="mb-4">
          Please install the GitHub app to view your repositories.
        </p>
        <button
          className="border-2 p-2 rounded"
          onClick={() =>
            window.open("https://github.com/apps/direwolf-demo-app", "_blank")
          }
        >
          Install GitHub App
        </button>
      </div>
    </div>
  )
}

export default Login
