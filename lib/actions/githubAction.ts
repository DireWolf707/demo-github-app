"use server"
import { github } from "../github/client"
import { getUser } from "../serverUtils"
import { getUserInstallationIdAction } from "./userAction"

export const getUserReposAction = async () => {
  const installationId = await getUserInstallationIdAction()
  if (!installationId) return null

  const octokit = await github.getInstallationOctokit(installationId)
  const repos = await octokit.paginate(
    octokit.rest.apps.listReposAccessibleToInstallation,
    { per_page: 100 }
  )

  repos.reverse()

  return repos
}

export const getRepoBranchesAction = async (repoName: string) => {
  const user = await getUser()
  const installationId = await getUserInstallationIdAction()
  if (!installationId) throw new Error("Github App Not Installed")

  const octokit = await github.getInstallationOctokit(installationId)
  const repos = await octokit.paginate(octokit.rest.repos.listBranches, {
    owner: user!.username,
    repo: repoName,
    per_page: 100,
  })

  return repos
}
