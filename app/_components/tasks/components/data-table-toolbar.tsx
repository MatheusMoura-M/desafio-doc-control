"use client"

import { Table } from "@tanstack/react-table"
import { CircleHelp, Plus, X } from "lucide-react"

import { Button } from "@/_components/ui/button"
// import { DataTableViewOptions } from "./data-table-view-options"

import { originsDocument, typesDocument } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Label } from "@/_components/ui/label"
import { SetStateAction } from "react"
import { Dialog, DialogTrigger } from "../../ui/dialog"
import { CreateDocumentoModal } from "../../create-document-modal"

export interface TableProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
  setDocumentName,
}: TableProps<TData> & {
  setDocumentName: React.Dispatch<SetStateAction<string>>
}) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="ml-[1px] mt-[5px] flex flex-1 items-center space-x-2">
        {table.getColumn("origem_do_documento") && (
          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2">
              Origem do documento <CircleHelp size={14} color="gray" />
            </Label>

            <DataTableFacetedFilter
              column={table.getColumn("origem_do_documento")}
              title="Origem do Documento"
              options={originsDocument}
            />
          </div>
        )}
        {table.getColumn("tipo_documental") && (
          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2">
              Tipo documental <CircleHelp size={14} color="gray" />
            </Label>

            <DataTableFacetedFilter
              column={table.getColumn("tipo_documental")}
              title="Tipo Documental"
              options={typesDocument}
            />
          </div>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              setDocumentName("")
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <div className="flex h-10 w-[163px] items-center gap-1 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
            <Plus />
            <Button className="px-0 shadow-none">Novo documento</Button>
          </div>
        </DialogTrigger>

        <CreateDocumentoModal />
      </Dialog>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  )
}
