import { z } from "zod"
import { branchT } from "./types"

export const buildDeploymentFormSchema = (_branches: branchT[]) => {
  const branches = _branches.map((branch) => branch.name) as [
    string,
    ...string[]
  ]

  return z.object({
    name: z.string().trim(),
    autoDeploy: z.boolean(),
    branch: z.enum(branches),
    envFile: z.string().trim(),
  })
}
