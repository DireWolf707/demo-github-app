"use server"
import { db } from "@/drizzle/client"
import { buildDeploymentFormSchema } from "../zodSchemas"
import { getRepoBranchesAction } from "./githubAction"
import { deploymentTable } from "@/drizzle/schema"
import { getUser } from "../serverUtils"

export const createDeploymentAction = async (
  _data: unknown,
  repoName: string
) => {
  const user = await getUser(true)
  const branches = await getRepoBranchesAction(repoName)
  const deploymentFormSchema = buildDeploymentFormSchema(branches)
  const data = deploymentFormSchema.parse(_data)

  await db.insert(deploymentTable).values({
    ...data,
    userId: user!.id!,
  })
}
