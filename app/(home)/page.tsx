import SignInButton from "@/components/auth/SignInButton"
import SignOutButton from "@/components/auth/SignOutButton"
import RepoList from "@/components/layout/RepoList"
import { getUserReposAction } from "@/lib/actions/githubAction"
import { getUser } from "@/lib/serverUtils"
import { Suspense } from "react"

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ installation_id?: string }>
}) => {
  const user = await getUser(false)
  const { installation_id } = await searchParams
  const repos = getUserReposAction(installation_id)

  return (
    <div>
      {!user ? <SignInButton /> : <SignOutButton />}
      <Suspense fallback={<div>Loading...</div>}>
        <RepoList user={user} repos={repos} />
      </Suspense>
    </div>
  )
}

export default page
