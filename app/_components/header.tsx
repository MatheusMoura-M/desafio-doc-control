import { UserButton } from "@clerk/nextjs"
import { Bell, ChevronDown, LayoutGrid, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-2 shadow-sm">
      <div className="flex items-center gap-[22px]">
        <button className="p-2">
          <Menu className="h-6 w-6" />
        </button>

        <Link href="/" className="flex items-center gap-2 pl-3">
          <Image src="/logo.png" alt="Logo" width={29} height={26} />
          e-paper
        </Link>

        <nav className="flex items-center gap-2 border-l pl-[35px]">
          <LayoutGrid />

          <span className="text-sm font-medium text-black">Soluções</span>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <Bell />

        <div className="flex items-center pl-[30px]">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Button className="ml-2 pr-5 text-sm font-medium text-gray-700">
            <UserButton showName />
          </Button>

          <ChevronDown />
        </div>
      </div>
    </header>
  )
}
