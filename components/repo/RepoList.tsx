"use client"
import { useEffect, useState } from "react"
import AppInstallButton from "./AppInstallButton"
import RefreshButton from "./RefreshButton"
import SearchButton from "./SearchButton"
import { useGetUserRepos } from "@/lib/hooks/githubHook"
import { repoT } from "@/lib/types"

const RepoList = () => {
  const { data, isFetching, isError } = useGetUserRepos()
  const [repos, setRepos] = useState<repoT[] | null>(null)

  useEffect(() => {
    if (isFetching) setRepos(null)
    else if (!isFetching && data) setRepos(data)
  }, [data, isFetching])

  return (
    <div className="text-center">
      <RefreshButton disabled={isFetching} />
      <AppInstallButton disabled={isFetching} repos={!!repos} />

      {isFetching && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {!isFetching && repos && (
        <div>
          <SearchButton repos={data} setRepos={setRepos} />

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
      )}
    </div>
  )
}

export default RepoList
