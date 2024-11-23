import { Button } from "@/_components/ui/button"
import { TableProps } from "./data-table-toolbar"

export function DataTablePagination<TData>({ table }: TableProps<TData>) {
  return (
    <div className="flex items-center justify-end py-4 md:space-x-2">
      <div className="text-muted-foreground hidden text-sm md:block">
        {table.getRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length}
      </div>

      <div className="w-full space-x-2 md:w-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="xs:w-[49%] w-[47%] md:w-auto"
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="xs:w-[49%] w-[47%] md:w-auto"
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
