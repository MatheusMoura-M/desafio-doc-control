"use client"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { useEffect, useState } from "react"
import { getAllDocuments } from "@/app/_actions/get-all-documents"
import { useDocuments } from "@/app/_context/document"

interface DataTablePageProps {
  searchParams: {
    user: string
  }
}

const DataTablePage = ({ searchParams }: DataTablePageProps) => {
  const user = searchParams.user
  const [loading, setLoading] = useState(true)
  const { documents, setDocuments, setUser } = useDocuments()

  useEffect(() => {
    async function fetchTasks() {
      try {
        setUser(user)

        // CRIAR DOCUMENTOS DINAMICAMENTE
        // documentsJson.forEach(async (doc) => {
        //   await createDocument(doc)
        // })

        const allDocuments = await getAllDocuments(user)

        setDocuments(allDocuments)
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [setDocuments, setUser, user])

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <DataTable data={documents} columns={columns} loading={loading} />
    </div>
  )
}

export default DataTablePage
