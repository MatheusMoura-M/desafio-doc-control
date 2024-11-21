"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/_components/ui/checkbox"
import { originsDocument, typesDocument } from "../data/data"
import { Document } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

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
    accessorKey: "nome_documento",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome do Documento" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue("nome_documento")}
      </span>
    ),
  },
  {
    accessorKey: "emitente",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emitente" />
    ),
    cell: ({ row }) => <span>{row.getValue("emitente")}</span>,
  },
  {
    accessorKey: "valor_total_dos_tributos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor Total dos Tributos" />
    ),
    cell: ({ row }) => {
      const value: number = row.getValue("valor_total_dos_tributos")
      return (
        <span>
          {value.toLocaleString("pt-BR", {
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
    accessorKey: "valor_liquido",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor Líquido" />
    ),
    cell: ({ row }) => {
      const value: number = row.getValue("valor_liquido")
      return (
        <span>
          {value.toLocaleString("pt-BR", {
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
    accessorKey: "data_de_criacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Criação" />
    ),
    cell: ({ row }) => <span>{row.getValue("data_de_criacao")}</span>,
  },
  {
    accessorKey: "ultima_atualizacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última Atualização" />
    ),
    cell: ({ row }) => <span>{row.getValue("ultima_atualizacao")}</span>,
  },
  {
    accessorKey: "origem_do_documento",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Origem do Documento" />
    ),
    cell: ({ row }) => {
      const origem = originsDocument.find(
        (origem) => origem.value === row.getValue("origem_do_documento"),
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
    accessorKey: "tipo_documental",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo Documental" />
    ),
    cell: ({ row }) => {
      const tipo = typesDocument.find(
        (tipo) => tipo.value === row.getValue("tipo_documental"),
      )

      if (!tipo) {
        return null
      }

      return <span>{tipo.label}</span>
    },
    filterFn: (row, columnId, value) => {
      return value.includes(row.getValue(columnId))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
