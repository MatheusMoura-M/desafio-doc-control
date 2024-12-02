"use client"

import { Table } from "@tanstack/react-table"
import { CircleHelp, Plus, X } from "lucide-react"

import { Button } from "@/_components/ui/button"
import { Label } from "@/_components/ui/label"
import { SetStateAction } from "react"
import { CreateDocumentoModal } from "../../create-document-modal"
import { Dialog, DialogTrigger } from "../../ui/dialog"
import { originsDocument, typesDocument } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import ViewerModalFile from "../../viewer-modal-file"
import { useDocuments } from "@/app/_context/document"

export interface TableProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
  setDocumentName,
}: TableProps<TData> & {
  setDocumentName: React.Dispatch<SetStateAction<string>>
}) {
  const { showModalViewer, setShowModalViewer } = useDocuments()
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="ml-[1px] mt-[5px] flex flex-1 flex-col items-center sm:flex-row sm:space-x-2">
        {table.getColumn("origin") && (
          <div className="flex w-full flex-col gap-2 sm:w-1/2 md:w-auto">
            <Label className="flex items-center gap-2 text-blue-lighter">
              Origem do documento <CircleHelp size={14} color="gray" />
            </Label>

            <DataTableFacetedFilter
              column={table.getColumn("origin")}
              title="Origem do Documento"
              options={originsDocument}
            />
          </div>
        )}
        {table.getColumn("type") && (
          <div className="mb-2 mt-6 flex w-full flex-col gap-2 sm:mb-0 sm:mt-0 sm:w-1/2 md:w-auto">
            <Label className="flex items-center gap-2 text-blue-lighter">
              Tipo documental <CircleHelp size={14} color="gray" />
            </Label>

            <DataTableFacetedFilter
              column={table.getColumn("type")}
              title="Tipo Documental"
              options={typesDocument}
            />
          </div>
        )}
        {isFiltered && (
          <Button
            onClick={() => {
              table.resetColumnFilters()
              setDocumentName("")
            }}
            className="mt-6 h-8 gap-1 border border-red-400 px-2 text-red-500"
          >
            Limpar
            <X />
          </Button>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute bottom-32 right-6 z-10 flex h-14 w-14 items-center gap-1 self-end rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 lg:static lg:h-10 lg:w-[163px] lg:rounded-md">
            <Plus />
            <Button className="hidden px-0 shadow-none lg:block">
              Novo documento
            </Button>
          </div>
        </DialogTrigger>

        <CreateDocumentoModal />
      </Dialog>

      <Dialog open={showModalViewer} onOpenChange={setShowModalViewer}>
        {showModalViewer && <ViewerModalFile />}
      </Dialog>
    </div>
  )
}
