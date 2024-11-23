import { UserButton } from "@clerk/nextjs"
import { Bell, ChevronDown, LayoutGrid, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-2 shadow-sm sm:px-6">
      <div className="flex items-center gap-3 sm:gap-[22px]">
        <button className="p-2">
          <Menu className="h-6 w-6" />
        </button>

        <Link href="/" className="flex items-center gap-2 sm:pl-3">
          <Image src="/logo.png" alt="Logo" width={29} height={26} />
          e-paper
        </Link>

        <nav className="xs:flex hidden items-center gap-2 pl-0 sm:border-l sm:pl-[35px]">
          <LayoutGrid />

          <span className="xs:block hidden text-sm font-medium text-black">
            Soluções
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-5">
        <Bell className="xs:block hidden" />

        <div className="hidden items-center sm:flex">
          <Button className="ml-2 pr-5 text-sm font-medium text-gray-700">
            <UserButton showName />

            <ChevronDown />
          </Button>
        </div>
        <div className="flex items-center sm:hidden">
          <Button className="ml-2 text-sm font-medium text-gray-700 sm:pr-5">
            <UserButton />

            <ChevronDown />
          </Button>
        </div>
      </div>
    </header>
  )
}
