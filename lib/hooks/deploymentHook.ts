import { useMutation } from "@tanstack/react-query"
import { createDeploymentAction } from "../actions/deploymentAction"

export const useCreateDeployemnt = (repoName: string) => {
  return useMutation({
    mutationFn: (data) => createDeploymentAction(data, repoName),
  })
}
