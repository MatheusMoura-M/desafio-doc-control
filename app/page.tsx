import Header from "@/_components/header"
import DataTablePage from "./_components/tasks/page"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const Home = async () => {
  const { userId } = await auth()

  console.log("aaaaaaaaaaaaaaa", userId)
  if (!userId) redirect("/login")
  return (
    <>
      <Header />

      <main className="p-8 pr-12">
        <DataTablePage />
      </main>
    </>
  )
}

export default Home
