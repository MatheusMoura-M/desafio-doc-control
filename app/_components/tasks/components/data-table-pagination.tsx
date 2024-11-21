import { Button } from "@/_components/ui/button"
import { TableProps } from "./data-table-toolbar"

export function DataTablePagination<TData>({ table }: TableProps<TData>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="text-muted-foreground text-sm">
        {table.getRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length}
      </div>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
