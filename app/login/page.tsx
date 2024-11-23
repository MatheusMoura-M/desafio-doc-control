import { SignInButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { Button } from "../_components/ui/button"
import { redirect } from "next/navigation"

const LoginPage = async () => {
  const { userId } = await auth()

  if (userId) redirect("/")
  return (
    <SignInButton>
      <Button className="ml-2 pr-5 text-sm font-medium text-gray-700">
        Login
      </Button>
    </SignInButton>
  )
}

export default LoginPage
