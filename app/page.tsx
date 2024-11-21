/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Header from "@/_components/header"
import DataTablePage from "./_components/tasks/page"

export default function Home() {
  return (
    <>
      <Header />

      <main className="p-8 pr-12">
        <DataTablePage />
      </main>
    </>
  )
}
