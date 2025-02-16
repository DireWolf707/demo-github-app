"use server"
import { github } from "../github/client"
import { getInstallationId } from "../serverUtils"
import { repoT } from "../types"
import { getUserAction } from "./userAction"

export const getUserReposAction = async (
  searchParamInstallationId?: string
) => {
  const user = await getUserAction()
  const installationId = getInstallationId(user, searchParamInstallationId)
  console.log(installationId)

  if (!installationId) return null

  const octokit = await github.getInstallationOctokit(installationId)

  let page = 1,
    currCount = 0,
    totalCount
  const per_page = 100
  const repos: repoT[] = []

  do {
    const { data } = await octokit.rest.apps.listReposAccessibleToInstallation({
      page,
      per_page,
    })

    repos.push(...data.repositories)
    currCount += data.repositories.length
    totalCount = data.total_count
    page++
  } while (currCount != totalCount)

  repos.reverse()

  return repos
}
