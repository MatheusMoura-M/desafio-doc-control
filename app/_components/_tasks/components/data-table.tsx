"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table"

import { FilterSheet } from "@/_components/filter-sheet"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Sheet, SheetTrigger } from "@/_components/ui/sheet"
import { Filter, Search } from "lucide-react"
import { useState } from "react"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { Separator } from "../../ui/separator"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
}: DataTableProps<TData, TValue>) {
  const [documentName, setDocumentName] = useState("")

  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 6,
      },
    },
  })

  const handleDocumentNameChange = (value: string) => {
    setDocumentName(value)

    table.getColumn("fileUrl")?.setFilterValue(value)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center">
        <div>
          <h1 className="text-xl font-semibold text-blue-lighter">
            Documentos
          </h1>
          <p className="truncate text-sm text-gray-500">
            Crie, gerencie e visualize os documentos
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center md:w-auto">
          <div className="relative w-full sm:w-[80%] md:max-w-sm">
            <Input
              placeholder="Buscar documentos"
              value={documentName}
              onChange={(e) => handleDocumentNameChange(e.target.value)}
              className="h-10 w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-[250px] lg:w-[330px]"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="flex h-10 w-full items-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 sm:w-[20%] md:w-[93px]"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </SheetTrigger>

            <FilterSheet table={table} setDocumentName={setDocumentName} />
          </Sheet>
        </div>
      </div>

      <Separator className="mt-4 bg-Gray" />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <DataTableToolbar table={table} setDocumentName={setDocumentName} />

          <div id="container_table" className="mt-4 rounded border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="text-blue-lighter [&_span]:block [&_span]:w-max"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

              <TableFooter className="hidden bg-[#F9FAFB] lg:table-footer-group">
                <TableRow>
                  <TableCell className="p-2"></TableCell>
                  <TableCell className="p-2">
                    <span className="block text-xs text-Gray-blue">Total</span>
                    <p className="text-blue-lighter">
                      {table.getRowModel().rows.length} documentos
                    </p>
                  </TableCell>
                  <TableCell className="p-2">
                    <span className="block w-max text-xs text-Gray-blue">
                      nº de emitentes
                    </span>

                    <p className="text-blue-lighter">
                      {
                        [
                          ...new Set(
                            table
                              .getRowModel()
                              .rows.map(
                                (row) =>
                                  (row.original as { emitter: string }).emitter,
                              ),
                          ),
                        ].length
                      }{" "}
                      emitentes
                    </p>
                  </TableCell>
                  <TableCell className="p-2">
                    <span className="block text-xs text-Gray-blue">
                      Total de tributos
                    </span>
                    <p className="text-[#3A424E]">
                      R$
                      {table
                        .getRowModel()
                        .rows.reduce((sum, row) => {
                          const valor =
                            parseFloat(
                              (
                                row.original as {
                                  taxValue: string
                                }
                              ).taxValue,
                            ) || 0

                          return sum + valor
                        }, 0)
                        .toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                    </p>
                  </TableCell>
                  <TableCell className="p-2">
                    <span className="block text-xs text-Gray-blue">
                      Total valor líquido
                    </span>
                    <p className="text-blue-lighter">
                      R$
                      {table
                        .getRowModel()
                        .rows.reduce((sum, row) => {
                          const valor =
                            parseFloat(
                              (
                                row.original as {
                                  netValue: string
                                }
                              ).netValue,
                            ) || 0

                          return sum + valor
                        }, 0)
                        .toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                    </p>
                  </TableCell>
                  <TableCell className="p-2"></TableCell>
                  <TableCell className="p-2"></TableCell>
                  <TableCell className="p-2"></TableCell>
                  <TableCell className="p-2"></TableCell>
                  <TableCell className="p-2"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  )
}
