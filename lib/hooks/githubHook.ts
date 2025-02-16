import { useQuery } from "@tanstack/react-query"
import { getUserReposAction } from "../actions/githubAction"

export const useGetUserRepos = () => {
  return useQuery({
    queryKey: ["repos"],
    queryFn: getUserReposAction,
  })
}
