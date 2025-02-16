import { userTable } from "@/drizzle/schema"
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods"
import { z } from "zod"
import { deploymentFormSchema } from "./zodSchemas"

export type userT = typeof userTable.$inferSelect

export type repoT =
  RestEndpointMethodTypes["apps"]["listReposAccessibleToInstallation"]["response"]["data"]["repositories"][number]

export type branchT =
  RestEndpointMethodTypes["repos"]["listBranches"]["response"]["data"][number]

export type createDeploymentT = z.infer<typeof deploymentFormSchema>
