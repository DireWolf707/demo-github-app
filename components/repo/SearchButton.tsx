import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { repoT } from "@/lib/types"

const SearchButton = ({
  repos,
  setRepos,
}: {
  repos?: repoT[] | null
  setRepos: Dispatch<SetStateAction<repoT[] | null>>
}) => {
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    if (repos)
      setRepos(
        repos.filter((repo) =>
          repo.name.toLowerCase().includes(search.toLowerCase())
        )
      )
  }, [search, repos, setRepos])

  return (
    <Input
      placeholder="search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}

export default SearchButton
