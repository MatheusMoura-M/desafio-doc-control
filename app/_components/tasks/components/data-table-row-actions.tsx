"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal, Trash, View } from "lucide-react"

import { Button } from "@/_components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu"
import { documentSchema } from "../data/schema"
import { useDocuments } from "@/app/_context/document"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const task = documentSchema.parse(row.original)
  const { setDocuments } = useDocuments()

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/document/${id}`, {
        method: "DELETE",
      })

      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== id),
      )
    } catch (error) {
      console.error("Erro ao excluir documento:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="flex h-[74px] w-[205px] flex-col items-start justify-center bg-white p-1"
      >
        <DropdownMenuItem className="h-1/2 cursor-pointer py-0">
          <DropdownMenuShortcut className="opacity-100">
            <View size={14} color="black" />
          </DropdownMenuShortcut>
          Visualizar
        </DropdownMenuItem>

        <DropdownMenuItem
          className="h-1/2 cursor-pointer py-0"
          onClick={() => handleDelete(task.id)}
        >
          <DropdownMenuShortcut className="opacity-100">
            <Trash size={14} color="black" />
          </DropdownMenuShortcut>
          Excluir documento
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
