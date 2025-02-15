import Login from "@/components/layout/Login"
import { getUser } from "@/lib/serverUtils"

const page = async () => {
  const user = await getUser(false)

  return <Login user={user} />
}

export default page
