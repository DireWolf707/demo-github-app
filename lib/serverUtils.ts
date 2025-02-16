import { auth } from "@/auth"
import { userT } from "./types"

export const getUser = async (required: boolean = true) => {
  const session = await auth()

  if (!session && required) throw new Error("Not Authenticated!")
  if (session?.user) return session.user
  else return null
}

export const getInstallationId = (
  user: userT | null,
  searchParamInstallationId?: string
) => {
  if (user?.githubInstallationId) return user.githubInstallationId

  if (searchParamInstallationId) return parseInt(searchParamInstallationId)

  return null
}
