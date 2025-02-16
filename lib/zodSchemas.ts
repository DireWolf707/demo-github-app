import { z } from "zod"

export const deploymentFormSchema = z.object({
  name: z.string().trim(),
  autoDeploy: z.boolean(),
  branch: z.string(),
  envFile: z.string().trim().optional(),
})
