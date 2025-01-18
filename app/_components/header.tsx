"use client"

import { UserButton } from "@clerk/nextjs"
import { Bell, ChevronDown, LayoutGrid, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white py-2 shadow-sm">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 sm:px-6 xl2:px-0">
        <div className="flex items-center gap-3 sm:gap-[22px]">
          <button className="p-2">
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="flex items-center gap-2 sm:pl-3">
            <Image src="/logo.svg" alt="Logo" width={29} height={26} />
            e-paper
          </Link>

          <nav className="hidden items-center gap-2 pl-0 xs:flex sm:border-l sm:pl-[35px]">
            <LayoutGrid />

            <span className="hidden text-sm font-medium text-black xs:block">
              Soluções
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-5">
          <Bell className="hidden xs:block" />

          <div className="hidden items-center sm:flex">
            <Button
              id="btn_login"
              className="ml-2 gap-0 pr-5 text-sm font-medium text-gray-700"
            >
              <ChevronDown />

              <UserButton showName />
            </Button>
          </div>

          <div className="flex items-center sm:hidden">
            <Button className="ml-2 text-sm font-medium text-gray-700 sm:pr-5">
              <UserButton />

              <ChevronDown />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
