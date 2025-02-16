import { userTable } from "@/drizzle/schema"
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods"

export type userT = typeof userTable.$inferSelect

export type repoT =
  RestEndpointMethodTypes["apps"]["listReposAccessibleToInstallation"]["response"]["data"]["repositories"][number]
