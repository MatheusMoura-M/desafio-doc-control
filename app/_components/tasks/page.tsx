import Image from "next/image"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
// import { UserNav } from "./components/user-nav"
import { useEffect, useState } from "react"

export default function DataTablePage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks")
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

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
        <DataTable data={tasks} columns={columns} loading={loading} />
      </div>
    </>
  )
}
