import { SignInButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { Button } from "../_components/ui/button"
import { redirect } from "next/navigation"

const LoginPage = async () => {
  const { userId } = await auth()

  if (userId) redirect("/")

  return (
    <div className="flex h-screen w-screen bg-gradient-to-r from-[#55866e] via-[#7eca9b] to-[#7eca9b]">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-semibold text-gray-700">
            Faça seu login
          </h1>
          <div className="flex justify-center">
            <SignInButton>
              <Button className="w-full rounded-md bg-green-500 py-2 text-white transition hover:bg-green-600">
                Login
              </Button>
            </SignInButton>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            Você será redirecionado para a tela de login.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
