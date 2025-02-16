import React from "react"
import DeploymentForm from "@/components/repo/DeploymentForm"
import { getRepoBranchesAction } from "@/lib/actions/githubAction"

const Deploy = async ({
  params,
}: {
  params: Promise<{ repoName: string }>
}) => {
  const { repoName } = await params
  const branches = await getRepoBranchesAction(repoName)

  return <DeploymentForm branches={branches} />
}

export default Deploy
