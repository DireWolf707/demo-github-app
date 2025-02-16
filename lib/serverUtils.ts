import { auth } from "@/auth"

export const getUser = async (required: boolean = true) => {
  const session = await auth()

  if (!session && required) throw new Error("Not Authenticated!")
  if (session?.user) return session.user
  else return null
}
