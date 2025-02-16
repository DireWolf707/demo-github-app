"use server"
import { db } from "@/drizzle/client"
import { getUser } from "../serverUtils"
import { userTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getUserAction = async () => {
  const user = await getUser(false)

  if (!user) return null

  const [result] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, user!.id!))

  return result
}
