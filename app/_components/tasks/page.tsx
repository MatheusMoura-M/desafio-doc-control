"use client"

import Image from "next/image"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { useEffect, useState } from "react"
import { getAllDocuments } from "@/app/_actions/get-all-documents"
import { useDocuments } from "@/app/_context/document"

const DataTablePage = () => {
  const [loading, setLoading] = useState(true)
  const { documents, setDocuments } = useDocuments()

  useEffect(() => {
    async function fetchTasks() {
      try {
        const allDocuments = await getAllDocuments()

        setDocuments(allDocuments)
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [setDocuments])

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>

      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <DataTable data={documents} columns={columns} loading={loading} />
      </div>
    </>
  )
}

export default DataTablePage
