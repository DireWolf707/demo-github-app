import { repoT } from "@/lib/types"
import { User } from "next-auth"

const RepoList = async ({
  user,
  repos: _repos,
}: {
  user: User | null
  repos: Promise<repoT[] | null>
}) => {
  const repos = await _repos

  if (!user) return <></>

  if (!repos)
    return (
      <div>
        <p className="mb-4">
          Please install the GitHub app to view your repositories.
        </p>
        <a
          className="border-2 p-2 rounded"
          href={
            "https://github.com/apps/" +
            process.env.GITHUB_APP_NAME +
            "/installations/new"
          }
        >
          Install GitHub App
        </a>
      </div>
    )

  return (
    <div>
      <div className="text-center">
        <div>
          {repos.map((repo) => (
            <div key={repo.id} className="border-2">
              {/* <UserAvatar src={owner.avatar_url} /> */}
              <div> Username: {repo.owner.login}</div>
              Project:
              <a href={repo.url} target="_blank">
                {repo.name}
              </a>
              <div>{repo.private ? "Private" : "Public"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RepoList
