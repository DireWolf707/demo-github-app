"use client"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"

const SignInButton = () => {
  return <Button onClick={() => signIn("github")}>Sign In</Button>
}

export default SignInButton
