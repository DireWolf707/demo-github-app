import { auth } from "@/auth"

export const getUser = async (required: boolean = true) => {
  const session = await auth()

  if (session?.user) return session.user

  if (!required) return null

  throw new Error("Not Authenticated!")
}
