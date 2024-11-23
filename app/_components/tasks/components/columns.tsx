"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/_components/ui/checkbox"
import { originsDocument, typesDocument } from "../data/data"
import { Document } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const columns: ColumnDef<Document>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fileUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome do Documento" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("fileUrl")

      const formattedValue = typeof value === "string" && value.split("&&")[0]

      return (
        <span className="line-clamp-2 max-w-[200px] truncate whitespace-normal font-medium">
          {formattedValue}
        </span>
      )
    },
  },
  {
    accessorKey: "emitter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emitente" />
    ),
    cell: ({ row }) => <span>{row.getValue("emitter")}</span>,
  },
  {
    accessorKey: "taxValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor Total dos Tributos" />
    ),
    cell: ({ row }) => {
      const value: number = row.getValue("taxValue")
      return (
        <span>
          {Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      )
    },
    filterFn: (row, columnId, filterValue) => {
      const cellValue = String(row.getValue(columnId))

      return cellValue.startsWith(filterValue)
    },
  },
  {
    accessorKey: "netValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor Líquido" />
    ),
    cell: ({ row }) => {
      const value: number = row.getValue("netValue")

      return (
        <span>
          {Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      )
    },
    filterFn: (row, columnId, filterValue) => {
      const cellValue = String(row.getValue(columnId))
      return cellValue.startsWith(filterValue)
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Criação" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("createdAt")
      const formattedDate =
        value instanceof Date &&
        format(value, "dd 'de' MMMM yyyy", { locale: ptBR })

      return <span>{formattedDate}</span>
    },
    filterFn: (row, columnId, value) => {
      const rowDate = new Date(row.getValue(columnId)).toDateString()
      const filterDate = new Date(value).toDateString()

      return rowDate === filterDate
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última Atualização" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("updatedAt")
      const formattedDate =
        value instanceof Date &&
        format(value, "dd 'de' MMMM yyyy", { locale: ptBR })

      return <span>{formattedDate}</span>
    },
  },
  {
    accessorKey: "origin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Origem do Documento" />
    ),
    cell: ({ row }) => {
      const origem = originsDocument.find(
        (origem) => origem.value === row.getValue("origin"),
      )

      if (!origem) {
        return null
      }

      return <span>{origem.label}</span>
    },
    filterFn: (row, columnId, value) => {
      return value.includes(row.getValue(columnId))
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo Documental" />
    ),
    cell: ({ row }) => {
      const tipo = typesDocument.find(
        (tipo) => tipo.value === row.getValue("type"),
      )

      if (!tipo) {
        return null
      }

      return <span>{tipo.label}</span>
    },
    filterFn: (row, columnId, value) => {
      const valueFound = row.getValue(columnId)

      if (Array.isArray(value)) {
        return value.includes(valueFound)
      }

      return (
        typeof valueFound === "string" &&
        new RegExp(`^${value}`, "i").test(valueFound)
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
