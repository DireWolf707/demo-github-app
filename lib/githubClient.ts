import { App as GithubApp } from "@octokit/app"

if (
  !process.env.GITHUB_APP_ID ||
  !process.env.GITHUB_WEBHOOK_SECRET ||
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET ||
  !process.env.GITHUB_PRIVATE_KEY
)
  throw new Error("Environment variables not set")

const githubApp = new GithubApp({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  webhooks: {
    secret: process.env.GITHUB_WEBHOOK_SECRET,
  },
  oauth: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
})

githubApp.webhooks.on("ping", () => {
  console.log("I am pinged!")
})

githubApp.webhooks.onError((err) => {
  if (err.name === "AggregateError")
    console.error(`Error processing request: ${err.event}`)
  else console.error(err)
})

export { githubApp }
