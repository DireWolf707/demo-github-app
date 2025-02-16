import SignInButton from "@/components/auth/SignInButton"
import SignOutButton from "@/components/auth/SignOutButton"
import RepoList from "@/components/repo/RepoList"
import { getUser } from "@/lib/serverUtils"

const Home = async () => {
  const user = await getUser(false)

  return (
    <div>
      {!user ? <SignInButton /> : <SignOutButton />}
      {user && <RepoList />}
    </div>
  )
}

export default Home
