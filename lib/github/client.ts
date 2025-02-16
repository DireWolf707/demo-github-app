import { db } from "@/drizzle/client"
import { userTable } from "@/drizzle/schema"
import { App as GithubApp } from "octokit"
import { eq } from "drizzle-orm"

if (
  !process.env.GITHUB_APP_ID ||
  !process.env.GITHUB_WEBHOOK_SECRET ||
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET ||
  !process.env.GITHUB_PRIVATE_KEY
)
  throw new Error("Environment variables not set")

const github = new GithubApp({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  webhooks: {
    secret: process.env.GITHUB_WEBHOOK_SECRET,
  },
})

github.webhooks.on("ping", () => {
  console.log("I am pinged!")
})

github.webhooks.on("installation.created", async ({ payload }) => {
  const githubInstallationId = payload.installation.id
  const username = payload.sender.login

  await db
    .update(userTable)
    .set({ githubInstallationId })
    .where(eq(userTable.username, username))
})

github.webhooks.on("installation.deleted", async ({ payload }) => {
  const username = payload.sender.login

  await db
    .update(userTable)
    .set({ githubInstallationId: null })
    .where(eq(userTable.username, username))
})

github.webhooks.onError((err) => {
  if (err.name === "AggregateError")
    console.error(`Error processing request: ${err.event}`)
  else console.error(err)
})

export { github }
