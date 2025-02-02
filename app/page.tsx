import Header from "@/_components/header"
import DataTablePage from "./_components/_tasks/page"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Image from "next/image"

const Home = async () => {
  const { userId } = await auth()

  if (!userId) redirect("/login")

  return (
    <>
      <Header />

      <main className="mx-auto mb-12 min-h-[80vh] max-w-screen-xl p-5 md:mb-5 md:p-8 lg:pr-12 xl2:px-0">
        <DataTablePage searchParams={{ user: userId }} />
      </main>

      <footer className="fixed bottom-0 flex h-14 w-full items-center justify-center gap-5 bg-[#F9FAFB]">
        <Image
          src="/logo_footer.svg"
          alt="Logo footer"
          width={40}
          height={40}
          style={{ width: "40px", height: "40px" }}
        />
        <span className="text-Gray-blue">Copyright © 2024 e-paper</span>
      </footer>
    </>
  )
}

export default Home
